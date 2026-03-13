"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "./sidebar";
import { getCurrentUser } from "@/lib/api";

export function SidebarClient({ items }: any) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      const u = await getCurrentUser();
      setUser(u);
    };

    loadUser();
  }, []);

  if (!user) return null;

  return (
    <Sidebar
      items={items}
      user={{
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl || "/demo/avatar.jpg",
      }}
    />
  );
} 