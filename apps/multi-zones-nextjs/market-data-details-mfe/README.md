# Market Data Details MFE: Fintech App

A micro-frontend representing the market data asset detail page in the fintech platform.
Follows **Next.js Multi-Zones Micro-frontend Architecture**.

## Compatibility

The project is compatible with the following technology versions:
- **Next.js**: `v16.2.5`
- **React**: `v19.2.4`
- **Node.js**: `v20+`   
  This project was tested with **Node.js** `v22.17.0`.

## Run Locally

1. Add this line to your hosts file:

    ```text
    127.0.0.1       market-data-details.local-fintech.com
    ```

2. Run the development server:

    ```bash
    npm run dev
    ```

3. Open the MFE in the browser:

   Open one of the following URLs to see the result in the browser:
    - If you didn't configure a custom hostname, use: [http://localhost:5004/market-data/ASSET_CODE](http://localhost:5004/market-data/aapl)   
      Example: http://localhost:5004/market-data/aapl
    - If you configured a custom hostname, use: [http://market-data-details.local-fintech.com:5004/market-data/ASSET_CODE](http://market-data-details.local-fintech.com:5004/market-data/aapl)   
      Example: http://market-data-details.local-fintech.com:5004/market-data/aapl
    - If you have the shell running, use: [http://shell.local-fintech.com:5000/market-data/ASSET_CODE](http://shell.local-fintech.com:5000/market-data/aapl)  
      Example: http://shell.local-fintech.com:5000/market-data/aapl

**ASSET_CODE** is the code of the asset, which can be found under the `id` key in the [src/app/data/asset-details.json](./src/app/data/asset-details.json) file.