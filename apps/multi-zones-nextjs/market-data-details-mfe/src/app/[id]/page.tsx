export default async function MarketDataDetailsPage({params}: { params: Promise<{ id: string }> }) {
    // If you visit http://localhost:5000/market-data/AAPL
    // params.id will equal "AAPL"
    const resolvedParams = await params;
    return (
        <>
        <header className="container flex flex-col flex-1 items-center p-6">
            <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                Market Data Details Page
            </h1>
        </header>
        <div>
            <h2>Market Data Details for: {resolvedParams.id}</h2>
        </div>
        </>
    );
}
