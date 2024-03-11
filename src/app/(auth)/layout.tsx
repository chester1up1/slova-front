export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="flex flex-col items-center justify-center w-full h-[100vh]">
        {children}
      </div>
    </main>
  );
}
