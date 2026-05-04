import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { HttpError, useSelect } from "@refinedev/core";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CreateView, CreateViewHeader } from "@/components/refine-ui/views/create-view";
import { EditView, EditViewHeader } from "@/components/refine-ui/views/edit-view";
import { LoadingOverlay } from "@/components/refine-ui/layout/loading-overlay";

const formSchema = z.object({
  codigo: z.string().min(1, "El código es requerido"),
  nombre: z.string().min(1, "El nombre es requerido"),
  descripcion: z.string().optional(),
  nivel: z.coerce.number().min(1).max(4),
  padreId: z.coerce.number().nullable().optional(),
  estado: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

interface UnidadEjecutora {
  id: number;
  codigo: string;
  nombre: string;
  nivel: number;
  padreId?: number | null;
  estado?: string;
  descripcion?: string;
}

function UnidadesEjectorasForm({ isEdit = false }: { isEdit?: boolean }) {
  const {
    refineCore: { onFinish, query },
    ...form
  } = useForm<UnidadEjecutora, HttpError, FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codigo: "",
      nombre: "",
      descripcion: "",
      nivel: 4,
      padreId: null,
      estado: "active",
    },
    refineCoreProps: {
      resource: "dbo-unidades-ejecutoras",
    },
  });

  const { options: padreOptions } = useSelect<UnidadEjecutora>({
    resource: "dbo-unidades-ejecutoras",
    optionLabel: "nombre",
    optionValue: "id",
    pagination: { pageSize: 100 },
  });

  const isLoading = query?.isLoading ?? false;

  function onSubmit(values: FormValues) {
    onFinish({
      codigo: values.codigo,
      nombre: values.nombre,
      descripcion: values.descripcion,
      nivel: values.nivel,
      padreId: values.padreId ?? null,
      estado: values.estado,
    });
  }

  const formContent = (
    <LoadingOverlay loading={isLoading}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 max-w-2xl">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="codigo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: UE-001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nivel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nivel *</FormLabel>
                  <Select onValueChange={(v) => field.onChange(Number(v))} value={String(field.value)}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar nivel" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Nacional</SelectItem>
                      <SelectItem value="2">Departamental</SelectItem>
                      <SelectItem value="3">Municipal</SelectItem>
                      <SelectItem value="4">Institucional</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre *</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre de la unidad ejecutora" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="descripcion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descripción de la unidad ejecutora"
                    rows={3}
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="padreId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unidad Padre</FormLabel>
                <Select
                  onValueChange={(v) => field.onChange(v === "none" ? null : Number(v))}
                  value={field.value != null ? String(field.value) : "none"}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sin unidad padre" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">Sin unidad padre</SelectItem>
                    {padreOptions?.map((opt) => (
                      <SelectItem key={String(opt.value)} value={String(opt.value)}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="estado"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3">
                <FormLabel className="mt-0">Estado activo</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value === "active" || field.value === "activo"}
                    onCheckedChange={(checked) => field.onChange(checked ? "active" : "inactive")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </Form>
    </LoadingOverlay>
  );

  if (isEdit) {
    return (
      <EditView>
        <EditViewHeader title="Editar Unidad Ejecutora" />
        {formContent}
      </EditView>
    );
  }

  return (
    <CreateView>
      <CreateViewHeader title="Crear Unidad Ejecutora" />
      {formContent}
    </CreateView>
  );
}

export function UnidadesEjectorasCreate() {
  return <UnidadesEjectorasForm isEdit={false} />;
}

export function UnidadesEjectorasEdit() {
  return <UnidadesEjectorasForm isEdit={true} />;
}
