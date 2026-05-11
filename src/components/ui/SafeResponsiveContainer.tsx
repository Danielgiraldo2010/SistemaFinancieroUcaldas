"use client";

import React from "react";
import { ResponsiveContainer as RechartsResponsiveContainer } from "recharts";

type Props = React.ComponentProps<typeof RechartsResponsiveContainer> & { wrapperClassName?: string };

export default function SafeResponsiveContainer({ children, wrapperClassName, ...props }: Props) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [sizeReady, setSizeReady] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current) return;
    // If explicit numeric height provided, render immediately
    const explicitHeight = typeof props.height === "number";
    if (explicitHeight) {
      setSizeReady(true);
      return;
    }

    const el = ref.current;
    const check = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) setSizeReady(true);
    };

    // Initial check
    check();

    // Observe changes
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => check());
      ro.observe(el);
    }

    return () => {
      if (ro) ro.disconnect();
    };
  }, [props.height]);

  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }} className={wrapperClassName ?? "w-full min-w-0"}>
      {sizeReady ? <RechartsResponsiveContainer {...props}>{children}</RechartsResponsiveContainer> : null}
    </div>
  );
}
