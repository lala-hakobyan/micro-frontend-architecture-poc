import Header from "@/app/layout/Header";
import MarketDataPage from "@/app/features/MarketDataPage";
import PerformanceMonitor from "@/app/utils/performanceMonitor";

const isPerformanceMonitorEnabled =  process.env.NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITOR === 'true';

export default function Home() {
  return (
    <>
        { isPerformanceMonitorEnabled && <PerformanceMonitor pageName={'Market Data'} /> }
        <Header />
        <main className="container mx-auto flex flex-col items-center p-6">
            <MarketDataPage />
        </main>
    </>
  );
}
