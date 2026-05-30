import PortfolioPage from "@/features/PortfolioPage";
import Header from "@/layout/Header";
import PerformanceMonitor from "@/utils/performanceMonitor";

const isPerformanceMonitorEnabled =  process.env.NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITOR === 'true';

export default function Home() {
    return (
        <>
            { isPerformanceMonitorEnabled && <PerformanceMonitor pageName={'Portfolio'} /> }
            <Header />
            <main className="container mx-auto flex flex-col items-center p-6">
                <PortfolioPage />
            </main>
        </>
    );
}
