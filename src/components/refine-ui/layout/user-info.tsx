import { useGetIdentity } from "@refinedev/core";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/refine-ui/layout/user-avatar";
import { cn } from "@/lib/utils";
import type { GetIdentityResponse } from "@/types";

export function UserInfo() {
  const { data: user, isLoading: userIsLoading } = useGetIdentity<GetIdentityResponse>();

  if (userIsLoading || !user) {
    return (
      <div className={cn("flex", "items-center", "gap-x-2")}>
        <Skeleton className={cn("h-10", "w-10", "rounded-full")} />
        <div className={cn("flex", "flex-col", "justify-between", "h-10")}>
          <Skeleton className={cn("h-4", "w-32")} />
          <Skeleton className={cn("h-4", "w-24")} />
        </div>
      </div>
    );
  }

  const name = getDisplayName(user);
  const email = user.email ?? "";

  return (
    <div className={cn("flex", "items-center", "gap-x-2")}>
      <UserAvatar />
      <div
        className={cn(
          "flex",
          "flex-col",
          "justify-between",
          "h-10",
          "text-left",
        )}
      >
        <span className={cn("text-sm", "font-medium", "text-muted-foreground")}>
          {name}
        </span>
        <span className={cn("text-xs", "text-muted-foreground")}>{email}</span>
      </div>
    </div>
  );
}

const getDisplayName = (user: GetIdentityResponse) => {
  if (user.fullName) return user.fullName;
  const parts = [user.firstName, user.lastName].filter(Boolean);
  if (parts.length > 0) return parts.join(" ");
  return user.email ?? "Usuario";
};

UserInfo.displayName = "UserInfo";
