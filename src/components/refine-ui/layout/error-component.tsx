import { useNavigate } from "react-router";

export function ErrorComponent() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-muted-foreground">Página no encontrada</p>
      <button onClick={() => navigate("/")} className="underline text-sm">Ir al inicio</button>
    </div>
  );
}
