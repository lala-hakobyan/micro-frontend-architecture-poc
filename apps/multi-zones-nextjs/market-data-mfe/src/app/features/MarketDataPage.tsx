import marketData from '../data/market-data.json';

const appUrl = process.env.NEXT_PUBLIC_SHELL_URL;

export default function MarketDataPage() {
    return (
        <div className="container mx-auto flex flex-col items-center p-6 w-full max-w-5xl">
            <h2 className="mb-8 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                Market Overview
            </h2>

            <div className="flex flex-col gap-4 w-full">
                {marketData.map((asset) => (
                    <a
                        key={asset.id}
                        href={`${appUrl}/market-data/${asset.id}`}
                        className="prerender-hover group flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                    >
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                                {asset.symbol}
                            </span>
                            <span className="text-sm text-zinc-500 dark:text-zinc-400">
                                {asset.name} • {asset.assetClass}
                            </span>
                        </div>

                        <div className="flex flex-col items-end">
                            <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                                ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                            <span className={`text-sm font-medium ${asset.change24h >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                            </span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}