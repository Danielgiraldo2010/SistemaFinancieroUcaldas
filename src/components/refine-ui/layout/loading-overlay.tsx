import { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props { children?: ReactNode; loading?: boolean }

export function LoadingOverlay({ children, loading }: Props) {
  return (
    <div className="relative">
      {loading && (
        <div className={cn("absolute inset-0 z-10 flex items-center justify-center bg-background/60 rounded-md")}>
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      {children}
    </div>
  );
}
