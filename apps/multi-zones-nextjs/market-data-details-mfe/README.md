# Market Data Details MFE: Fintech App

A micro-frontend representing the market data asset detail page in the fintech platform.
Follows **Next.js Multi-Zones Micro-frontend Architecture** with Speculative Loading performance optimization.

## Compatibility

The project is compatible with the following technology versions:
- **Next.js**: `v16.2.5`
- **React**: `v19.2.4`
- **Node.js**: `v20+`   
  This project was tested with **Node.js** `v22.17.0`.

## Run Locally

### Install Node Modules

Navigate to the MFE folder and install necessary node modules:

```bash
  cd apps/multi-zones-nextjs/market-data-details-mfe
  npm install
```

### Run without Custom Hostname, with localhost

**1. Update `.env.development` file to point to the localhost shell path**

```text
NEXT_PUBLIC_SHELL_URL = http://localhost:5000
```

**2. Run the development server**

```bash
npm run dev
```

**3. Open the MFE in the browser**

- Standalone: [http://localhost:5004/market-data/ASSET_CODE](http://localhost:5004/market-data/aapl)   
  Example: http://localhost:5004/market-data/aapl
- Via shell (if shell is running): [http://localhost:5000/market-data/ASSET_CODE](http://localhost:5000/market-data/aapl)   
  Example: http://localhost:5000/market-data/aapl

***Note:** **ASSET_CODE** is the code of the asset which can be found under the `id` key in the [src/app/data/asset-details.json](./src/app/data/asset-details.json) file.*

### Run with Custom Hostname and HTTPS

**1. Generate local SSL Certificate**

Follow the certificate generation instructions in the [Shell README](./../shell/README.md#run-with-custom-hostname-and-https) (step 1). The generated `.certs` folder lives at `apps/multi-zones-nextjs/.certs` and is shared by all MFEs.

**2. Add custom hostname**

Add this custom local hostname into your hosts file `[Windows: C:\Windows\System32\drivers\etc\hosts | Linux and macOS: /etc/hosts]`:
```text
127.0.0.1       market-data-details.local-fintech.com
```

**3. Update `.env.development` file to point to the shell custom path**

```text
NEXT_PUBLIC_SHELL_URL = https://shell.local-fintech.com:5000
```

**4. Run the development server with HTTPS**

```bash
npm run dev:https
```

**5. Open the MFE in the browser**

- Standalone: [https://market-data-details.local-fintech.com:5004/market-data/ASSET_CODE](https://market-data-details.local-fintech.com:5004/market-data/aapl)   
  Example: https://market-data-details.local-fintech.com:5004/market-data/aapl
- Via shell (if shell is running): [https://shell.local-fintech.com:5000/market-data/ASSET_CODE](https://shell.local-fintech.com:5000/market-data/aapl)   
  Example: https://shell.local-fintech.com:5000/market-data/aapl

***Note:** **ASSET_CODE** is the code of the asset which can be found under the `id` key in the [src/app/data/asset-details.json](./src/app/data/asset-details.json) file.*
