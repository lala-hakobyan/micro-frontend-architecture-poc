# Shell: Fintech App POC

A root shell application responsible for routing and proxying independent micro-frontends in the fintech platform. It leverages **Next.js Multi-Zones micro-frontend architecture**, where each domain is served as a separate standalone application/document with independent navigation.

For strict infrastructure isolation, this domain acts as a pure shell and does not own application UI. Instead, upon load, it redirects to the default MFE, which is the Market Data Platform MFE.

Each micro-frontend implements **Speculative Loading** for performance optimization. Domains such as Portfolio, Market Data, Market Data Details and Trading remain strictly independent, but interlink with each other and the shell to create a unified system.

## Compatibility

The project is compatible with the following technology versions:
- **Next.js**: `v16.2.5`
- **React**: `v19.2.4`
- **Node.js**: `v20+`   
  This project was tested with **Node.js** `v22.17.0`.

## Run Locally

### Install Node Modules

Navigate to each micro-frontend and install necessary node modules for each of them and the Shell.

- Shell: 
  ```bash
  cd apps/multi-zones-nextjs/shell
  npm install
  ```
  
- Market Data MFE: 
  ```bash
  cd apps/multi-zones-nextjs/market-data-mfe
  npm install
  ```
  
- Market Data Details MFE: 
  ```bash
  cd apps/multi-zones-nextjs/market-data-details-mfe
  npm install
  ```
  
- Portfolio MFE: 
  ```bash
  cd apps/multi-zones-nextjs/portfolio-mfe
  npm install
  ```

- Trading MFE:
  ```bash
  cd apps/multi-zones-nextjs/trading-mfe
  npm install
  ```

### Run without Custom Hostname, with localhost

**1. Update `.env.development` file to point to these custom hostnames**
```text
NEXT_PUBLIC_APP_URL = http://localhost:5000
NEXT_PUBLIC_MARKET_DATA_URL = http://localhost:5001
NEXT_PUBLIC_MARKET_DATA_DETAILS_URL = http://localhost:5004
NEXT_PUBLIC_PORTFOLIO_URL = http://localhost:5002
NEXT_PUBLIC_TRADING_URL = http://localhost:5003
```

**2. Update `NEXT_PUBLIC_SHELL_URL` path in each MFE `.env.development` to point to the shell custom path**

```text
NEXT_PUBLIC_SHELL_URL = http://localhost:5000
```

**3. Run shell and MFEs**
- Open separate terminal windows for each micro-frontend and shell.
- For each project, navigate to the specific project and use `npm run dev` to run it with localhost.
  For convenience, you can rename terminal windows for specific MFE name.

**4. Open shell and MFEs in the browser**

- Shell: [http://localhost:5000](http://localhost:5000)
- Market data page: [http://localhost:5000/market-data](http://localhost:5000/market-data)
- Market data details page: [http://localhost:5000/market-data/ASSET_CODE](http://localhost:5000/market-data/aapl)   
  Example: http://localhost:5000/market-data/aapl  
  ***Note:** **ASSET_CODE** is the code of the asset which can be found under the `id` key in the [market-data-details-mfe/src/app/data/asset-details.json](./../market-data-details-mfe/src/app/data/asset-details.json) file.*
- Trading page: [http://localhost:5000/trading](http://localhost:5000/trading)
- Portfolio page: [http://localhost:5000/portfolio](http://localhost:5000/portfolio)


### Run with Custom Hostname and HTTPS

**1. Generate local SSL Certificate**

- **Instructions for Windows:**
    - Run **Powershell** as administrator
    - Install **mkcert** program: `choco install mkcert`
    - Go to specific **multi-zones-nextjs** project physical folder: `cd C:\GIT\PERSONAL\micro-frontend-architecture-poc\apps\multi-zones-nextjs`
    - Create `.certs` folder to store certificates: `mkdir .certs`
    - Generate certificates:
      ```text
      mkcert -key-file .certs/local-fintech-key.pem -cert-file .certs/local-fintech-cert.pem shell.local-fintech.com market-data-details.local-fintech.com market-data.local-fintech.com trading.local-fintech.com portfolio.local-fintech.com
      ```
    - Locate the master Root CA directory on your machine: `mkcert -CAROOT`
    - Copy this master certificate into your project so Next.js can trust the local HTTPS proxy connections between your micro-frontends (Next.js relies on the underlying Node.js engine, which bypasses the Windows OS certificate store):  
      `copy "$(mkcert -CAROOT)\rootCA.pem" .certs\rootCA.pem`

- **Instructions for MacOS / Linux:**
    - Open **Terminal**
    - Install **mkcert** (and nss tools for Firefox support):
        - *MacOS:* `brew install mkcert nss`
        - *Linux (Ubuntu/Debian):* `sudo apt update && sudo apt install mkcert libnss3-tools`
    - Go to specific **multi-zones-nextjs** project physical folder: `cd ~/GIT/PERSONAL/micro-frontend-architecture-poc/apps/multi-zones-nextjs`
    - Create `.certs` folder to store certificates: `mkdir -p .certs`
    - Generate certificates:
      ```bash
      mkcert -key-file .certs/local-fintech-key.pem -cert-file .certs/local-fintech-cert.pem shell.local-fintech.com market-data-details.local-fintech.com market-data.local-fintech.com trading.local-fintech.com portfolio.local-fintech.com
      ```
    - Locate the master Root CA directory on your machine: `mkcert -CAROOT`
    - Copy this master certificate into your project so Next.js can trust the local HTTPS proxy connections between your micro-frontends:  
      `cp "$(mkcert -CAROOT)/rootCA.pem" .certs/rootCA.pem`

After these installation steps, you should see `.certs` folder under `micro-frontend-architecture-poc\apps\multi-zones-nextjs` path with the certificates:

```text
local-fintech-cert.pem
local-fintech-key.pem
rootCA.pem
```

The `.certs` folder is included in `.gitignore`.

**2. Add custom hostnames**

Add these custom local hostnames into your hosts file `[Windows: C:\Windows\System32\drivers\etc\hosts | Linux and macOS: /etc/hosts]`:
 ```text
 127.0.0.1       shell.local-fintech.com
 127.0.0.1       market-data-details.local-fintech.com
 127.0.0.1       trading.local-fintech.com
 127.0.0.1       portfolio.local-fintech.com
 ```

**3. Update `.env.development` file to point to these custom hostnames**
```text
NEXT_PUBLIC_APP_URL = https://shell.local-fintech.com:5000
NEXT_PUBLIC_MARKET_DATA_URL = https://market-data.local-fintech.com:5001
NEXT_PUBLIC_MARKET_DATA_DETAILS_URL = https://market-data-details.local-fintech.com:5004
NEXT_PUBLIC_PORTFOLIO_URL = https://portfolio.local-fintech.com:5002
NEXT_PUBLIC_TRADING_URL = https://trading.local-fintech.com:5003
```

**4. Update `NEXT_PUBLIC_SHELL_URL` path in each MFE `.env.development` to point to the shell custom path**

```text
NEXT_PUBLIC_SHELL_URL = https://shell.local-fintech.com:5000
```

**5. Run shell and MFEs**
- Open separate terminal windows for each micro-frontend and shell.
- For each project, navigate to the specific project and use `npm run dev:https` to run it with HTTPS.
For convenience, you can rename terminal windows for specific MFE name.

**6. Open shell and MFEs in the browser**

- Shell: [https://shell.local-fintech.com:5000](https://shell.local-fintech.com:5000)
- Market data page: [https://shell.local-fintech.com:5000/market-data](https://shell.local-fintech.com:5000/market-data)
- Market data details page: [https://shell.local-fintech.com:5000/market-data/ASSET_CODE](https://shell.local-fintech.com:5000/market-data/aapl)   
    Example: https://shell.local-fintech.com:5000/market-data/aapl  
    ***Note:** **ASSET_CODE** is the code of the asset which can be found under the `id` key in the [market-data-details-mfe/src/app/data/asset-details.json](./../market-data-details-mfe/src/app/data/asset-details.json) file.*
- Trading page: [https://shell.local-fintech.com:5000/trading](https://shell.local-fintech.com:5000/trading)
- Portfolio page: [https://shell.local-fintech.com:5000/portfolio](https://shell.local-fintech.com:5000/portfolio)
