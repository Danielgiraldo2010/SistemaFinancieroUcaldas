import { Construction } from "lucide-react";

export default function PlaceholderPage() {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
      <Construction className="h-12 w-12 text-muted-foreground/40" />
      <div>
        <h2 className="text-lg font-semibold text-foreground">Módulo en construcción</h2>
        <p className="text-sm text-muted-foreground mt-1">Este módulo estará disponible próximamente.</p>
      </div>
    </div>
  );
}
