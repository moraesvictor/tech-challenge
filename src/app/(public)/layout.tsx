import { MainHeader } from "@/components/layout/main-header/main-header";
import { HEADER_COLORS } from "@/components/layout/main-header/main-header.types";
import { Footer } from "@/modules/home/components/footer/footer";
import { HomeHeaderContainer } from "@/modules/home/home-header-container/home-header-container";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader color={HEADER_COLORS.dark}>
        <HomeHeaderContainer />
      </MainHeader>
      <main className="flex-1 bg-gradient-to-b from-cyan-600 to-cyan-100">
        {children}
      </main>
      <Footer />
    </div>
  );
}
