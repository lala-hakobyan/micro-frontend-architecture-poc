import Header from "@/app/layout/Header";
import MarketDataPage from "@/app/features/MarketDataPage";

export default function Home() {
  return (
    <>
        <Header />
        <main className="container mx-auto flex flex-col items-center p-6">
            <MarketDataPage />
        </main>
    </>
  );
}
