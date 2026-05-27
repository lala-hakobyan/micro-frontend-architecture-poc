import portfolioData from '../data/portfolio.json'; // Adjust path as needed

export default function PortfolioPage() {
    // Calculate aggregate portfolio metrics
    const totalValue = portfolioData.reduce((sum, asset) => sum + (asset.sharesOwned * asset.currentPrice), 0);

    const total24hChangeUSD = portfolioData.reduce((sum, asset) => {
        const currentValue = asset.sharesOwned * asset.currentPrice;
        // Back-calculate previous day value to find true daily dollar delta
        const prevValue = currentValue / (1 + asset.change24h / 100);
        return sum + (currentValue - prevValue);
    }, 0);

    const total24hPercentChange = (total24hChangeUSD / (totalValue - total24hChangeUSD)) * 100;

    return (
        <div className="mx-auto flex flex-col items-center p-6 w-full max-w-5xl">
            <div className="w-full mb-8 text-center md:text-left">
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Portfolio
                </h2>
            </div>

            <div className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-6 mb-8 dark:border-zinc-800 dark:bg-zinc-900/50">
                <span className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Net Worth
                </span>
                <div className="mt-1 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className={`mt-2 text-sm font-medium ${total24hChangeUSD >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {total24hChangeUSD >= 0 ? '▲' : '▼'} ${Math.abs(total24hChangeUSD).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({total24hPercentChange >= 0 ? '+' : ''}{total24hPercentChange.toFixed(2)}%) <span className="text-zinc-400 dark:text-zinc-500 font-normal">today</span>
                </div>
            </div>

            <div className="w-full flex flex-col gap-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 px-1">
                    Your Holdings
                </h3>

                {portfolioData.map((asset) => {
                    const currentHoldingValue = asset.sharesOwned * asset.currentPrice;
                    const totalReturnUSD = currentHoldingValue - (asset.sharesOwned * asset.avgBuyPrice);

                    return (
                        <div
                            key={asset.id}
                            className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
                        >
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                                    {asset.symbol}
                                </span>
                                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                                    {asset.sharesOwned} {asset.symbol} • {asset.assetClass}
                                </span>
                            </div>

                            <div className="flex flex-col items-end">
                                <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                                    ${currentHoldingValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                                <span className={`text-sm font-medium ${totalReturnUSD >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                    {totalReturnUSD >= 0 ? 'Total +' : 'Total '}${totalReturnUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}