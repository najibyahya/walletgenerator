const bip39 = require('bip39');
const { hdkey } = require('ethereumjs-wallet');
const { randomBytes } = require('crypto');
const fs = require('fs');
const readline = require('readline');

// Fungsi untuk menghasilkan wallet
function generateWallet() {
    const mnemonic = bip39.generateMnemonic(128);
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const hdwallet = hdkey.fromMasterSeed(seed);
    const walletHDPath = "m/44'/60'/0'/0/";
    const wallet = hdwallet.derivePath(walletHDPath + '0').getWallet();
    const privateKey = wallet.getPrivateKeyString();
    const address = wallet.getAddressString();

    return { mnemonic, privateKey, address };
}

// Fungsi utama
async function main() {
    console.log("\n================================================================");
    console.log("                     \x1b[94mBEP-20 Wallet Generator\x1b[0m                     ");
    console.log("================================================================");
    console.log("                                                                ");
    console.log("Skrip ini menghasilkan wallet BEP-20 secara acak menggunakan    ");
    console.log("seed phrase BIP39. Setiap wallet memiliki address, seed phrase, ");
    console.log("dan private key yang aman. Data wallet akan disimpan dalam      ");
    console.log("file wallet.txt dan hanya address yang disimpan dalam file      ");
    console.log("address.txt.                                                    ");
    console.log("                                                                ");
    console.log("            Github: \x1b[94mhttps://github.com/najibyahya\x1b[0m               ");
    console.log("              Telegram: \x1b[94mhttps://t.me/andraz404\x1b[0m                   ");
    console.log("                                                                ");
    console.log("================================================================");

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const question = (str) => new Promise(resolve => rl.question(str, resolve));

    const numWallets = await question("\nMasukkan jumlah wallet yang ingin dibuat: ");
    rl.close();

    for (let i = 0; i < numWallets; i++) {
        const { mnemonic, privateKey, address } = generateWallet();

        fs.appendFileSync('wallet.txt', `${address} // ${mnemonic} // ${privateKey}\n`);
        fs.appendFileSync('address.txt', `${address}\n`);

        console.log(`\n\x1b[93mWallet ${i + 1}\x1b[0m`);
        console.log(`\x1b[94mAddress     : \x1b[92m${address}\x1b[0m`);
        console.log(`\x1b[94mSeed Phrase : \x1b[92m${mnemonic}\x1b[0m`);
        console.log(`\x1b[94mPrivate Key : \x1b[92m${privateKey}\x1b[0m`);
    }

    console.log("\n\x1b[93mAddress, Seed Phrase & Private Key » wallet.txt");
    console.log("Address Only » address.txt\x1b[0m\n");
}

main();