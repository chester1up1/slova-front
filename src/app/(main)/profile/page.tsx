"use client";

import React from "react";

import { useAuth } from "@/contexts/auth.context";
import { syntaxHighlight } from "@/helpers";

export default function ProfilePage() {
  const { user } = useAuth();
  if (user)
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: syntaxHighlight(user) }} />
      </div>
    );
  return <></>;
}
