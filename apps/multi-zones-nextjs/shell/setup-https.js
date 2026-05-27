const devcert = require('devcert');
const fs = require('fs');
const path = require('path');

async function setup() {
    console.log('Generating local HTTPS certificates...');

    try {
        const ssl = await devcert.certificateFor([
            'localhost',
            'shell.local-fintech.com',
            'portfolio.local-fintech.com',
            'trading.local-fintech.com',
            'market-data-details.local-fintech.com'
        ]);

        // Puts the .certs folder one level UP from the shell, making it a sibling to your apps
        const certDir = path.join(__dirname, '../.certs');
        if (!fs.existsSync(certDir)) fs.mkdirSync(certDir);

        fs.writeFileSync(path.join(certDir, 'key.pem'), ssl.key);
        fs.writeFileSync(path.join(certDir, 'cert.pem'), ssl.cert);

        console.log('Certificates successfully generated in ../.certs!');
    } catch (error) {
        console.error('Failed to generate certificates:', error);
        process.exit(1);
    }
}

setup();