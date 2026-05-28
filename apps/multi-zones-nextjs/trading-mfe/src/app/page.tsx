// @ts-ignore
import TradingPage from "@/features/TradingPage";
import Header from "@/layout/Header";

export default function Home() {
    return (
        <>
            <Header />
            <main className="container mx-auto flex flex-col items-center p-6">
                <TradingPage />
            </main>
        </>
    );
}
