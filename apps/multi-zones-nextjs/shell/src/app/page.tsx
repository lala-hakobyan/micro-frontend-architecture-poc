export default function Home() {
  return (
      <>
      <header className="container flex flex-col flex-1 items-center p-6">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Shell: Market Data
          </h1>
          <nav>
              <ul>
                  <li><a href="http://localhost:5000/trading" className="prerender">Trading</a></li>
                  <li><a href="http://localhost:5000/portfolio" className="prefetch">Portfolio</a></li>
              </ul>
          </nav>
      </header>
      <main className="container flex flex-col flex-1 items-center p-6">
         <ul>
             <li><a href="http://localhost:5000/market-data/asset1">Asset1</a></li>
             <li><a href="http://localhost:5000/market-data/asset2">Asset2</a></li>
         </ul>
      </main>
      </>
  );
}
