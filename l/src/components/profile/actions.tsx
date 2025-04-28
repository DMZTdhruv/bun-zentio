"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { signOutAction } from "~/actions/auth";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const ProfileActions = () => {
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: signOutAction,
    onSuccess: () => {
      toast.success("logged out successfully");
      router.push("/sign-in");
    },
  });

  const handleSignOut = () => {
    mutate();
  };

  return (
    <div className="flex items-center gap-4 px-8 py-0">
      <Button onClick={handleSignOut}>Sign out</Button>
    </div>
  );
};
