import assetData from '../data/asset-details.json';

interface AssetDetailsPageProps {
    assetId: string;
}

export default function AssetDetailsPage({ assetId }: AssetDetailsPageProps) {
    const asset = assetData.find(a => a.id === assetId);

    if (!asset) {
        return (
            <div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center p-6">
                <p className="text-xl font-semibold text-zinc-500">Asset not found</p>
            </div>
        );
    }

    const isPositive = asset.change24h >= 0;
    const colorClass = isPositive ? 'text-emerald-500' : 'text-red-500';

    return (
        <div className="container mx-auto flex flex-col items-center p-6 w-full max-w-5xl">
            <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                            {asset.name}
                        </h3>
                        <span className="rounded bg-zinc-100 px-2 py-1 text-sm font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                            {asset.symbol} • {asset.assetClass}
                        </span>
                    </div>
                </div>

                <div className="text-left md:text-right">
                    <div className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className={`text-lg font-medium ${colorClass}`}>
                        {isPositive ? '+' : ''}{asset.change24h}% <span className="text-zinc-400 font-normal">Today</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">

                <div className="flex flex-col gap-6 lg:col-span-2">

                    <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4">
                            About {asset.name}
                        </h3>
                        <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                            {asset.description}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-6">
                            Key Statistics
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                            {asset.stats.map((stat) => (
                                <div key={stat.label} className="flex flex-col">
                                    <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                                        {stat.label}
                                    </span>
                                    <span className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
                                        {stat.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 lg:col-span-1">
                    <div className="rounded-2xl border border-zinc-200 bg-white p-6 h-fit dark:border-zinc-800 dark:bg-zinc-900">
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                            Trade {asset.symbol}
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                            Open the trading cockpit to execute orders and view live depth charts.
                        </p>

                        <a
                            href={`http://localhost:5000/trading?asset=${asset.id}`}
                            className="flex w-full justify-center rounded-xl bg-zinc-900 py-3 text-sm font-semibold text-white transition-transform active:scale-[0.98] hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 mb-3"
                        >
                            Open Trading Cockpit
                        </a>

                        <button className="flex w-full justify-center rounded-xl border border-zinc-200 bg-zinc-50 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700">
                            Add to Watchlist
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}