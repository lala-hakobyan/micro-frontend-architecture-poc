# Shell: Fintech App

A root shell application orchestrating independent micro-frontends in the fintech platform. It leverages **Next.js Multi-Zones micro-frontend architecture** where each domain serves as a separate document with independent navigation. 
To prioritize initial load performance and maintain a cohesive product experience the shell directly hosts the default market data list. 
For strict infrastructure isolation this domain can be extracted into a standalone micro-frontend configuring the shell to act purely as a routing gateway. 
The separate domains like Portfolio and Trading remain strictly independent but interlink with each other and the shell to create a unified system.

## Compatibility

The project is compatible with the following technology versions:
- **Next.js**: `v16.2.5`
- **React**: `v19.2.4`
- **Node.js**: `v20+`   
  This project was tested with **Node.js** `v22.17.0`.

## Run Locally

1. Configure a custom hostname:
    - Add these custom local hostnames into your hosts file `[Windows: C:\Windows\System32\drivers\etc\hosts | Linux and macOS: /etc/hosts]`:
         ```text
         127.0.0.1       shell.local-fintech.com
         127.0.0.1       market-data-details.local-fintech.com
         127.0.0.1       trading.local-fintech.com
         127.0.0.1       portfolio.local-fintech.com
         ```
    - Make sure all the paths in the `.env.development` file point to these custom hostnames (default value):
        ```text
        NEXT_PUBLIC_APP_URL = [http://shell.local-fintech.com:5000](http://shell.local-fintech.com:5000)
        NEXT_PUBLIC_MARKET_DATA_DETAILS_URL = [http://market-data-details.local-fintech.com:5004](http://market-data-details.local-fintech.com:5004)
        NEXT_PUBLIC_PORTFOLIO_URL = [http://portfolio.local-fintech.com:5002](http://portfolio.local-fintech.com:5002)
        NEXT_PUBLIC_TRADING_URL = [http://trading.local-fintech.com:5003](http://trading.local-fintech.com:5003)
        ```
    - Make sure the `NEXT_PUBLIC_SHELL_URL` path in each MFE `.env.development` points to the shell custom path (default value):
      ```text
        NEXT_PUBLIC_SHELL_URL = [http://shell.local-fintech.com:5000](http://shell.local-fintech.com:5000)
      ```

2. Configure running the project using `localhost` without a custom hostname:
    - Make sure all the paths in the `.env.development` file point to localhost:
        ```text
        NEXT_PUBLIC_APP_URL = http://localhost:5000
        NEXT_PUBLIC_MARKET_DATA_DETAILS_URL = http://localhost:5004
        NEXT_PUBLIC_PORTFOLIO_URL = http://localhost:5002
        NEXT_PUBLIC_TRADING_URL = http://localhost:5003
        ```
    - Make sure the `NEXT_PUBLIC_SHELL_URL` path in each MFE `.env.development` points to the shell localhost path:
      ```text
        NEXT_PUBLIC_SHELL_URL = http://localhost:5000
      ```

3. Run the development server of the shell:

    ```bash
    npm run dev
    ```

4. Run the development server of the child MFEs:

    - Run the market data details page MFE:
        - Open a new Terminal in your IDE and rename it to a descriptive name for convenience such as `market-data-details-mfe`
        - Navigate to the MFE destination folder: `cd apps/multi-zones-nextjs/market-data-details-mfe`
        - Run the MFE: `npm run dev`

    - Run the Portfolio MFE:
        - Open a new Terminal in your IDE and rename it to a descriptive name for convenience such as `portfolio-mfe`
        - Navigate to the MFE destination folder: `cd apps/multi-zones-nextjs/portfolio-mfe`
        - Run the MFE: `npm run dev`

    - Run the Trading MFE:
        - Open a new Terminal in your IDE and rename it to a descriptive name for convenience such as `trading-mfe`
        - Navigate to the MFE destination folder: `cd apps/multi-zones-nextjs/trading-mfe`
        - Run the MFE: `npm run dev`

5. Open the shell in the browser:

   Open one of the following URLs to see the result in the browser:
    - If you didn't configure a custom hostname, use: [http://localhost:5000](http://localhost:5000)
    - If you configured a custom hostname, use: [http://shell.local-fintech.com:5000](http://shell.local-fintech.com:5000)

6. Open the MFEs in the browser:
   You can use the menu to open MFEs from the shell. Alternatively you can use these URLs to navigate to MFE pages directly:

    - Market data details page: [http://shell.local-fintech.com:5000/market-data/ASSET_CODE](http://shell.local-fintech.com:5000/market-data/aapl)   
      Example: http://shell.local-fintech.com:5000/market-data/aapl

      ***Note:** **ASSET_CODE** is the code of the asset which can be found under the `id` key in the [market-data-details-mfe/src/app/data/asset-details.json](./../market-data-details-mfe/src/app/data/asset-details.json) file.*

    - Trading page: [http://shell.local-fintech.com:5000/trading](http://shell.local-fintech.com:5000/trading)

    - Portfolio page: [http://shell.local-fintech.com:5000/portfolio](http://shell.local-fintech.com:5000/portfolio)