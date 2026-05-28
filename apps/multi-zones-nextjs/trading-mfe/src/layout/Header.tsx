const appUrl = process.env.NEXT_PUBLIC_SHELL_URL;

export default function Header() {
    return (
        <header className="w-full border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
            <div className="container mx-auto flex flex-col items-center justify-between gap-6 p-6 lg:flex-row">
                <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Trading Platform: Micro-frontend
                </h1>
                <nav>
                    <ul className="flex items-center gap-8">
                        <li>
                            <a
                                href={`${appUrl}`}
                                className="prerender group relative text-lg font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                            >
                                Market Data
                                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-zinc-900 transition-all duration-300 ease-out group-hover:w-full dark:bg-zinc-50"></span>
                            </a>
                        </li>
                        <li>
                            <a
                                href={`${appUrl}/portfolio`}
                                className="prefetch group relative text-lg font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                            >
                                Portfolio
                                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-zinc-900 transition-all duration-300 ease-out group-hover:w-full dark:bg-zinc-50"></span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
