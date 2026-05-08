import { createDataProvider } from "@refinedev/rest";
import type { DataProvider, GetListParams, GetOneParams, CreateParams, UpdateParams, DeleteOneParams } from "@refinedev/core";
import type { KyInstance, KyResponse } from "ky";
import { API_URL, ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, LAST_ACTIVITY_KEY, REFRESH_TOKEN_ENDPOINT } from "./constants";

type AnyObject = Record<string, any>;

function resolveApiResource(resource: string) {
  switch (resource) {
    case "identity-users":
      return "api/identity/users";
    case "identity-roles":
      return "api/identity/roles";
    default:
      return `api/${resource}`;
  }
}

function normalizeUtf8String(str: string): string {
  // Intenta corregir caracteres rotos comunes por problemas de encoding
  // Reemplaza caracteres incorrectos que resultan de encoding issues
  if (!str || typeof str !== "string") return str;
  
  // Reemplazar patrones comunes de corrupción UTF-8
  return str
    .replace(/\?/g, (match, offset, str) => {
      // Intentar detectar si es un carácter corrompido rodeado de letras
      const before = str[offset - 1];
      const after = str[offset + 1];
      if (before && after && /[A-Za-z]/.test(before) && /[A-Za-z]/.test(after)) {
        // Podría ser un carácter acentuado corrompido
        return match; // Mantener por ahora
      }
      return match;
    });
}

function normalizeUtf8Object(obj: any): any {
  if (typeof obj === "string") {
    return normalizeUtf8String(obj);
  }
  if (Array.isArray(obj)) {
    return obj.map(normalizeUtf8Object);
  }
  if (obj !== null && typeof obj === "object") {
    const normalized: any = {};
    for (const key in obj) {
      normalized[key] = normalizeUtf8Object(obj[key]);
    }
    return normalized;
  }
  return obj;
}

async function readJsonBody(response: KyResponse<AnyObject>) {
  const text = await response.clone().text().catch(() => "");
  if (!text.trim()) return {};
  try {
    const parsed = JSON.parse(text) as AnyObject;
    return normalizeUtf8Object(parsed);
  } catch {
    return {};
  }
}

async function readErrorBody(response: KyResponse<AnyObject>) {
  const text = await response.clone().text().catch(() => "");
  if (!text) return null;
  try {
    return JSON.parse(text) as AnyObject;
  } catch {
    return text;
  }
}

const provider = createDataProvider(
  API_URL,
  {
    getList: {
      getEndpoint(params: GetListParams): string {
        return resolveApiResource(params.resource);
      },
      async buildQueryParams(params: GetListParams) {
        const { pagination, sorters, filters } = params;
        const query: Record<string, any> = {};

        if (pagination?.currentPage) {
          query.page = pagination.currentPage;
          query.pageSize = pagination.pageSize ?? 20;
        }

        if (sorters?.length) {
          query.sort = sorters.map(s => `${s.field}:${s.order}`).join(",");
        }

        const processFilters = (filters?: any[]): void => {
          for (const filter of filters ?? []) {
            if ("field" in filter) {
              if (filter.operator === "eq") {
                query[filter.field] = filter.value;
              } else {
                query[`${filter.field}_${filter.operator}`] = filter.value;
              }
            } else if ("operator" in filter && (filter.operator === "or" || filter.operator === "and")) {
              if (filter.value && Array.isArray(filter.value)) {
                processFilters(filter.value);
              }
            }
          }
        };
        processFilters(filters);

        if (params.meta?.query) Object.assign(query, params.meta.query);

        return query;
      },
      async mapResponse(
        response: KyResponse<AnyObject>,
        _params: GetListParams,
      ): Promise<any[]> {
        const body = await readJsonBody(response);
        return Array.isArray(body) ? body : (body.data || body.items || body.results || []);
      },
      async getTotalCount(
        response: KyResponse<AnyObject>,
        _params: GetListParams,
      ): Promise<number> {
        const totalHeader = response.headers.get("X-Total-Count") || response.headers.get("x-total-count");
        if (totalHeader) return parseInt(totalHeader, 10);

        const body = await readJsonBody(response);
        if ("total" in body) return body.total;
        if ("totalCount" in body) return body.totalCount;
        if ("count" in body) return body.count;
        if (body.meta?.total) return body.meta.total;
        if (body.pagination?.total) return body.pagination.total;

        if (Array.isArray(body)) return body.length;
        if (Array.isArray(body.data)) return body.data.length;
        if (Array.isArray(body.items)) return body.items.length;
        if (Array.isArray(body.results)) return body.results.length;
        return 0;
      },
    },

    getOne: {
      getEndpoint(params: GetOneParams): string {
        return `${resolveApiResource(params.resource)}/${encodeURIComponent(String(params.id))}`;
      },
      async mapResponse(
        response: KyResponse<AnyObject>,
        _params: GetOneParams,
      ): Promise<Record<string, any>> {
        const body = await readJsonBody(response);
        return body.data || body;
      },
    },

    update: {
      getEndpoint(params: UpdateParams<any>): string {
        return `${resolveApiResource(params.resource)}/${encodeURIComponent(String(params.id))}`;
      },
      getRequestMethod(params: UpdateParams<any>) {
        return params.meta?.method ?? "put";
      },
      async buildBodyParams(params: UpdateParams<any>) {
        return params.variables;
      },
      async mapResponse(
        response: KyResponse<AnyObject>,
        _params: UpdateParams<any>,
      ): Promise<Record<string, any>> {
        const body = await readJsonBody(response);
        return body.data || body;
      },
      async transformError(
        response: KyResponse<AnyObject>,
        params: UpdateParams<any>,
      ) {
        const body = await readErrorBody(response);
        return {
          message: JSON.stringify({
            ...(body && typeof body === "object"
              ? body
              : { error: body ?? (response.statusText || "Request failed") }),
            id: params.id,
            variables: params.variables,
          }),
          statusCode: response.status,
        };
      },
    },
    create: {
      getEndpoint(params: CreateParams<any>): string {
        return resolveApiResource(params.resource);
      },
      async buildBodyParams(params: CreateParams<any>) {
        return params.variables;
      },
      async mapResponse(
        response: KyResponse<AnyObject>,
        _params: CreateParams<any>,
      ): Promise<Record<string, any>> {
        const body = await readJsonBody(response);
        return body.data || body;
      },
      async transformError(
        response: KyResponse<AnyObject>,
        params: CreateParams<any>,
      ) {
        const body = await readErrorBody(response);
        return {
          message: JSON.stringify({
            ...(body && typeof body === "object"
              ? body
              : { error: body ?? (response.statusText || "Request failed") }),
            variables: params.variables,
          }),
          statusCode: response.status,
        };
      },
    },

    deleteOne: {
      getEndpoint(params: DeleteOneParams<any>): string {
        return `${resolveApiResource(params.resource)}/${encodeURIComponent(String(params.id))}`;
      },
      async mapResponse(_response: KyResponse<AnyObject>, _params: DeleteOneParams<any>) {
        return undefined;
      },
      async transformError(
        response: KyResponse<AnyObject>,
        params: DeleteOneParams<any>,
      ) {
        const body = await readErrorBody(response);
        return {
          message: JSON.stringify({
            ...(body && typeof body === "object"
              ? body
              : { error: body ?? (response.statusText || "Request failed") }),
            id: params.id,
          }),
          statusCode: response.status,
        };
      },
    },
  },
  {
    hooks: {
      beforeRequest: [
        async (request) => {
          const token = localStorage.getItem(ACCESS_TOKEN_KEY);
          if (token) {
            request.headers.set("Authorization", `Bearer ${token}`);
            localStorage.setItem(LAST_ACTIVITY_KEY, String(Date.now()));
          }
          // Asegurar UTF-8 encoding
          request.headers.set("Accept-Charset", "utf-8");
          if (!request.headers.has("Accept")) {
            request.headers.set("Accept", "application/json");
          }
          return request;
        },
      ],
      afterResponse: [
        async (_request, _options, response) => {
          if (response.status === 401) {
            const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
            if (refreshToken) {
              try {
                const refreshResponse = await fetch(`/${REFRESH_TOKEN_ENDPOINT}`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ refreshToken }),
                });

                if (refreshResponse.ok) {
                  const data = await refreshResponse.json();
                  localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
                  localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);

                  const newRequest = new Request(_request.url, {
                    method: _request.method,
                    headers: _request.headers,
                    body: _request.body,
                  });
                  newRequest.headers.set("Authorization", `Bearer ${data.accessToken}`);

                  return fetch(newRequest);
                }
              } catch (error) {
                localStorage.removeItem(ACCESS_TOKEN_KEY);
                localStorage.removeItem(REFRESH_TOKEN_KEY);
                window.location.href = "/login";
              }
            }
          }
          return response;
        },
      ],
    },
  },
);

export const dataProvider: DataProvider = provider.dataProvider;
export const kyInstance: KyInstance = provider.kyInstance;
