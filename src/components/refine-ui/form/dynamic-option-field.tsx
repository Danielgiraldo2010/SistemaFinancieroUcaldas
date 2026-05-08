"use client";

import { useMemo, useState } from "react";

import { useList, useOne } from "@refinedev/core";
import { useWatch } from "react-hook-form";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type DynamicOption = {
  label: string;
  value: string;
};

type OptionLike = Record<string, any>;

export type DynamicOptionFieldProps = {
  control: any;
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: DynamicOption[];
  optionResource?: string;
  optionLabelKey?: string;
  optionValueKey?: string;
  optionSearchKey?: string;
  optionLabelResolver?: (record: OptionLike) => string;
  searchable?: boolean;
  pageSize?: number;
  className?: string;
};

function isNil(value: unknown) {
  return value === null || value === undefined || value === "";
}

function normalizeOptionValue(value: unknown) {
  if (isNil(value)) return "";
  return String(value);
}

function buildLabel(record: OptionLike, fallbackKeys: string[], resolver?: (record: OptionLike) => string) {
  const resolved = resolver?.(record);
  if (resolved) return resolved;

  for (const key of fallbackKeys) {
    const value = record?.[key];
    if (!isNil(value)) return String(value);
  }

  return String(record?.id ?? record?.value ?? "");
}

function buildOptionValue(record: OptionLike, valueKey: string) {
  const value = record?.[valueKey];
  if (!isNil(value)) return String(value);
  return String(record?.id ?? "");
}

export function DynamicOptionField({
  control,
  name,
  label,
  required,
  placeholder,
  options = [],
  optionResource,
  optionLabelKey,
  optionValueKey = "id",
  optionSearchKey,
  optionLabelResolver,
  searchable = true,
  pageSize = 100,
  className,
}: DynamicOptionFieldProps) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const currentValue = useWatch({ control, name });
  const currentValueString = normalizeOptionValue(currentValue);

  const remoteEnabled = Boolean(optionResource);
  const searchField = optionSearchKey ?? optionLabelKey ?? optionValueKey ?? "nombre";

  const remote = useList<OptionLike>({
    resource: optionResource ?? "",
    pagination: { currentPage: 1, pageSize },
    filters: search.trim()
      ? [
          {
            field: searchField,
            operator: "contains",
            value: search.trim(),
          },
        ]
      : undefined,
    queryOptions: {
      enabled: remoteEnabled,
    },
  });

  const remoteOptions = useMemo<DynamicOption[]>(() => {
    const rows = ((remote.result?.data ?? []) as OptionLike[]) || [];
    return rows
      .map((record) => ({
        label: buildLabel(record, [optionLabelKey ?? "nombre", "fullName", "titulo", "codigo", "numero"], optionLabelResolver),
        value: buildOptionValue(record, optionValueKey),
      }))
      .filter((option) => Boolean(option.value))
      .filter((option, index, self) => self.findIndex((entry) => entry.value === option.value) === index);
  }, [optionLabelKey, optionLabelResolver, optionValueKey, remote.result?.data]);

  const mergedOptions = useMemo<DynamicOption[]>(() => {
    const list = remoteEnabled ? remoteOptions : options;
    return list.filter((option, index, self) => self.findIndex((entry) => entry.value === option.value) === index);
  }, [options, remoteEnabled, remoteOptions]);

  const selectedRecordQuery = useOne<OptionLike>({
    resource: optionResource ?? "",
    id: currentValueString,
    queryOptions: {
      enabled: Boolean(remoteEnabled && currentValueString && !mergedOptions.some((option) => option.value === currentValueString)),
    },
  });

  const selectedRecord = selectedRecordQuery.result?.data ?? selectedRecordQuery.query?.data?.data;
  const selectedRemoteOption = selectedRecord
    ? {
        label: buildLabel(selectedRecord, [optionLabelKey ?? "nombre", "fullName", "titulo", "codigo", "numero"], optionLabelResolver),
        value: buildOptionValue(selectedRecord, optionValueKey),
      }
    : null;

  const currentOption = mergedOptions.find((option) => option.value === currentValueString) ?? selectedRemoteOption;

  const shouldUseCombobox = useMemo(() => {
    if (!searchable) return false;
    if (!remoteEnabled) return mergedOptions.length > 20;
    if ((remote.result?.total ?? 0) > 20) return true;
    return mergedOptions.length > 20;
  }, [mergedOptions.length, remote.result?.total, remoteEnabled, searchable]);

  function handleChange(nextValue: string, onChange: (value: string) => void) {
    onChange(nextValue);
    if (!nextValue) return;
    setSearch("");
  }

  return (
    <FormField
      control={control}
      name={name as any}
      render={({ field }) => {
        const value = normalizeOptionValue(field.value);

        if (!shouldUseCombobox) {
          return (
            <FormItem className={cn(className)}>
              <FormLabel>
                {label}
                {required ? " *" : ""}
              </FormLabel>
              <Select
                value={value}
                onValueChange={(nextValue) => handleChange(nextValue === "__empty__" ? "" : nextValue, field.onChange)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={placeholder ?? `Seleccionar ${label.toLowerCase()}`} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {!required ? <SelectItem value="__empty__">Sin selección</SelectItem> : null}
                  {mergedOptions.map((option) => (
                    <SelectItem key={`${name}-${option.value}`} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          );
        }

        return (
          <FormItem className={cn(className)}>
            <FormLabel>
              {label}
              {required ? " *" : ""}
            </FormLabel>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    aria-expanded={isOpen}
                    className={cn("h-auto min-h-10 w-full justify-between gap-3 px-3", !value && "text-muted-foreground")}
                  >
                    <span className="truncate text-left">
                      {currentOption?.label ?? placeholder ?? `Seleccionar ${label.toLowerCase()}`}
                    </span>
                    <span className="flex items-center gap-2 text-muted-foreground">
                      {value ? (
                        <span
                          role="button"
                          tabIndex={-1}
                          className="inline-flex h-5 w-5 items-center justify-center rounded-sm transition-colors hover:text-destructive"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            handleChange("", field.onChange);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </span>
                      ) : null}
                      <ChevronsUpDown className="h-4 w-4 opacity-50" />
                    </span>
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                <Command>
                  <CommandInput
                    placeholder={`Buscar ${label.toLowerCase()}...`}
                    value={search}
                    onValueChange={setSearch}
                  />
                  <CommandList>
                    <CommandEmpty>Sin resultados.</CommandEmpty>
                    <CommandGroup>
                      {!required ? (
                        <CommandItem
                          value="Sin selección"
                          onSelect={() => {
                            handleChange("", field.onChange);
                            setIsOpen(false);
                          }}
                        >
                          Sin selección
                        </CommandItem>
                      ) : null}
                      {mergedOptions.map((option) => (
                        <CommandItem
                          key={`${name}-${option.value}`}
                          value={option.label}
                          onSelect={() => {
                            handleChange(option.value, field.onChange);
                            setIsOpen(false);
                          }}
                        >
                          {option.label}
                          <Check className={cn("ml-auto h-4 w-4", value === option.value ? "opacity-100" : "opacity-0")} />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
