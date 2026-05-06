import { useGetIdentity } from "@refinedev/core";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { GetIdentityResponse } from "@/types";

export function UserAvatar() {
  const { data: user, isLoading: userIsLoading } = useGetIdentity<GetIdentityResponse>();

  if (userIsLoading || !user) {
    return <Skeleton className={cn("h-10", "w-10", "rounded-full")} />;
  }

  const displayName = getDisplayName(user);
  const { avatar } = user;

  return (
    <Avatar className={cn("h-10", "w-10", "border", "border-[#efd9af]/40")}>
      {avatar && <AvatarImage src={avatar} alt={displayName} />}
      <AvatarFallback className="bg-[#d5bb87] text-sm font-bold text-[#00284d]">{getInitials(displayName)}</AvatarFallback>
    </Avatar>
  );
}

const getDisplayName = (user: GetIdentityResponse) => {
  if (user.fullName) return user.fullName;
  const parts = [user.firstName, user.lastName].filter(Boolean);
  if (parts.length > 0) return parts.join(" ");
  return user.email ?? "Usuario";
};

const getInitials = (name = "") => {
  const names = name.split(" ");
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

UserAvatar.displayName = "UserAvatar";
