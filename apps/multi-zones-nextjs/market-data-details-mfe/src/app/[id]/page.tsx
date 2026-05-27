import AssetDetailsPage from "@/app/features/AssetPage";
import Header from "@/app/layout/Header";

export default async function MarketDataDetailsPage({params}: { params: Promise<{ id: string }> }) {
    // If you visit http://localhost:5000/market-data/AAPL or http://shell.local-fintech.com:5000/market-data/AAPL
    // params.id will equal "AAPL"
    const resolvedParams = await params;
    return (
        <>
            <Header />
            <AssetDetailsPage assetId={resolvedParams.id} />
        </>
    );
}
