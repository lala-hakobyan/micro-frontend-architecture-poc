import tradingData from '../data/trading.json'; // Adjust path as needed

// Utility to convert an array of prices into SVG path coordinates
function generateSvgPath(data: { price: number }[], width: number, height: number): string {
    const prices = data.map(d => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const range = maxPrice - minPrice || 1; // Prevent divide by zero

    return data.map((point, index) => {
        // Calculate X based on array index spread evenly across the width
        const x = (index / (data.length - 1)) * width;
        // Calculate Y by plotting price within the height (SVG Y=0 is the top, so we invert it)
        const y = height - ((point.price - minPrice) / range) * height;

        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
}

export default function TradingPage() {
    // Determine sentiment colors
    const isPositive = tradingData.change24h >= 0;
    const colorClass = isPositive ? 'text-emerald-500' : 'text-red-500';
    const strokeClass = isPositive ? 'stroke-emerald-500' : 'stroke-red-500';
    const fillClass = isPositive ? 'fill-emerald-500/10 dark:fill-emerald-500/5' : 'fill-red-500/10 dark:fill-red-500/5';

    // Generate the path strings for the SVG (600x200 drawing area)
    const linePath = generateSvgPath(tradingData.chartData, 600, 200);
    const areaPath = `${linePath} L 600 240 L 0 240 Z`;

    return (
        <div className="container mx-auto flex flex-col items-center p-6 w-full max-w-5xl">
            <div className="w-full mb-8 text-center md:text-left">
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Trading Cockpit
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 w-full lg:grid-cols-3">

                {/* LEFT: Analytics Pane (Takes 2 columns) */}
                <div className="flex flex-col gap-6 lg:col-span-2">
                    <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                        {/* Header populated from JSON */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                                        {tradingData.symbol} / {tradingData.baseCurrency}
                                    </span>
                                    <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                                        {tradingData.assetClass}
                                    </span>
                                </div>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">{tradingData.name}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                                    ${tradingData.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                                <div className={`text-sm font-medium ${colorClass}`}>
                                    {isPositive ? '+' : ''}{tradingData.change24h}% <span className="text-zinc-400 font-normal">24h</span>
                                </div>
                            </div>
                        </div>

                        {/* Dynamic SVG Chart */}
                        <div className="relative w-full bg-zinc-50/50 rounded-xl p-2 dark:bg-zinc-950/20">
                            <svg viewBox="0 0 600 240" className="w-full h-64 overflow-visible">
                                {/* Background Grid Lines */}
                                <line x1="0" y1="50" x2="600" y2="50" className="stroke-zinc-100 dark:stroke-zinc-800/60" strokeDasharray="4 4" />
                                <line x1="0" y1="100" x2="600" y2="100" className="stroke-zinc-100 dark:stroke-zinc-800/60" strokeDasharray="4 4" />
                                <line x1="0" y1="150" x2="600" y2="150" className="stroke-zinc-100 dark:stroke-zinc-800/60" strokeDasharray="4 4" />

                                {/* Generated Paths */}
                                <path d={areaPath} className={fillClass} />
                                <path d={linePath} fill="none" className={strokeClass} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                            {/* Dynamic X-Axis Labels from JSON */}
                            <div className="flex justify-between items-center mt-2 px-2 text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
                                {tradingData.chartData.map((point) => (
                                    <span key={point.time}>{point.time}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Secondary Market stats row */}
                    <div className="grid grid-cols-3 gap-4 w-full">
                        <div className="rounded-xl border border-zinc-200 p-4 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">24h High</span>
                            <p className="text-sm font-semibold mt-0.5 text-zinc-900 dark:text-zinc-50">
                                ${tradingData.stats.high24h.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                        </div>
                        <div className="rounded-xl border border-zinc-200 p-4 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">24h Low</span>
                            <p className="text-sm font-semibold mt-0.5 text-zinc-900 dark:text-zinc-50">
                                ${tradingData.stats.low24h.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                        </div>
                        <div className="rounded-xl border border-zinc-200 p-4 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Volume</span>
                            <p className="text-sm font-semibold mt-0.5 text-zinc-900 dark:text-zinc-50">
                                {tradingData.stats.volume24h}
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Order Cockpit (Takes 1 column) */}
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 h-fit dark:border-zinc-800 dark:bg-zinc-900">
                    {/* Buy / Sell Toggle Tabs */}
                    <div className="grid grid-cols-2 p-1 bg-zinc-100 rounded-xl mb-6 dark:bg-zinc-800/60">
                        <button className="py-2 text-sm font-semibold rounded-lg text-center bg-white shadow-sm text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50">
                            Buy
                        </button>
                        <button className="py-2 text-sm font-medium rounded-lg text-center text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
                            Sell
                        </button>
                    </div>

                    {/* Order Inputs */}
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Order Type</label>
                            <select className="w-full mt-1.5 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm font-medium text-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
                                <option>Market Order</option>
                                <option>Limit Order</option>
                            </select>
                        </div>

                        <div>
                            {/* Dynamically label the input with the asset symbol */}
                            <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Amount ({tradingData.symbol})</label>
                            <div className="relative mt-1.5 flex items-center">
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 pr-14 text-sm font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                                />
                                <span className="absolute right-3 text-xs font-bold text-zinc-400">{tradingData.symbol}</span>
                            </div>
                        </div>

                        {/* Quick Size Percentage Pill Buttons */}
                        <div className="grid grid-cols-4 gap-2 pt-1">
                            {['25%', '50%', '75%', '100%'].map((pct) => (
                                <button key={pct} className="py-1.5 text-xs font-medium border border-zinc-200 rounded-lg bg-white text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50">
                                    {pct}
                                </button>
                            ))}
                        </div>

                        {/* Divider Line */}
                        <hr className="border-zinc-100 dark:border-zinc-800/80 my-4" />

                        {/* Order Cost Estimates */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-medium">
                                <span className="text-zinc-400">Estimated Price</span>
                                <span className="text-zinc-900 dark:text-zinc-50">
                                    ${tradingData.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                            </div>
                            <div className="flex justify-between text-xs font-medium">
                                <span className="text-zinc-400">Network Fee</span>
                                <span className="text-zinc-900 dark:text-zinc-50">
                                    ${tradingData.stats.networkFeeEst.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm font-bold pt-1">
                                <span className="text-zinc-500 dark:text-zinc-400">Total Cost</span>
                                <span className="text-zinc-900 dark:text-zinc-50">$0.00</span>
                            </div>
                        </div>

                        {/* Primary Action Button */}
                        <button className="w-full mt-2 rounded-xl bg-zinc-900 py-3 text-sm font-semibold text-white transition-transform active:scale-[0.98] hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200">
                            Execute Buy Order
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}