import type { Metadata } from "next";

import HeaderComponent from "@/components/modules/header";

export const metadata: Metadata = {
  title: "The Check",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full  m-auto">
      <HeaderComponent />
      <div className="px-[16px]">{children}</div>
    </main>
  );
}
