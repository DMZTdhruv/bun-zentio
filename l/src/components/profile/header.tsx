"use client";

import { _useAuthStore } from "~/store/user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const getInitials = (name: string | undefined) => {
  return name?.slice(0, 2).toUpperCase();
};

export const ProfileHeader = () => {
  const { user } = _useAuthStore();
  const initials = getInitials(user.name);
  return (
    <header className="flex items-center gap-4 p-8">
      <Avatar className="rounded-md">
        <AvatarImage src="" alt="@shadcn" />
        <AvatarFallback className="rounded-md border border-neutral-700">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <div className="font-medium">{user.username}</div>
        <div className="text-xs font-medium text-neutral-300">{user.name}</div>
      </div>
    </header>
  );
};
