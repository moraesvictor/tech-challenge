import { MainHeader } from "@/components/layout/main-header/main-header";
import { PrivateHeader } from "@/modules/private";
import { RouteProtector } from "@/components/auth/route-protector";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RouteProtector>
      <div className="flex flex-col min-h-screen">
        <MainHeader>
          <PrivateHeader />
        </MainHeader>
        <main className="flex-1 bg-gradient-to-b from-gray-200 to-cyan-100">
          {children}
        </main>
      </div>
    </RouteProtector>
  );
}
