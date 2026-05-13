"use client";

import React from "react";
import { ResponsiveContainer as RechartsResponsiveContainer } from "recharts";

type Props = React.ComponentProps<typeof RechartsResponsiveContainer> & { wrapperClassName?: string };

export default function SafeResponsiveContainer({ children, wrapperClassName, ...props }: Props) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      // Ensure width and height are positive; filter out invalid measurements from StrictMode double-renders
      const width = Math.max(0, Math.floor(rect.width));
      const height = Math.max(0, Math.floor(rect.height));

      const nextSize = { width, height };

      setSize((current) =>
        current.width === nextSize.width && current.height === nextSize.height
          ? current
          : nextSize,
      );
    };

    // Initial check with a small delay to allow layout to settle
    const timeoutId = setTimeout(updateSize, 0);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(updateSize);
      ro.observe(el);
    }

    return () => {
      clearTimeout(timeoutId);
      if (ro) ro.disconnect();
    };
  }, []);

  const canRender = size.width > 1 && size.height > 1;

  return (
    <div
      ref={ref}
      style={{ width: "100%", height: "100%", minWidth: 0, minHeight: 0 }}
      className={wrapperClassName ?? "w-full min-w-0 min-h-0"}
    >
      {canRender ? (
        <RechartsResponsiveContainer width={size.width} height={size.height}>
          {children}
        </RechartsResponsiveContainer>
      ) : null}
    </div>
  );
}
