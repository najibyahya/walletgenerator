from web3 import Web3
from eth_account import Account
from mnemonic import Mnemonic
import os

def generate_wallet():
    mnemo = Mnemonic("english")
    seed_phrase = mnemo.generate(strength=128)

    private_key_bytes = os.urandom(32)
    private_key_hex = private_key_bytes.hex()

    account = Account.from_key(private_key_hex)

    address = account.address

    return seed_phrase, private_key_hex, address

def main():

    print("\n================================================================")
    print("                     \033[94mBEP-20 Wallet Generator\033[0m                     ")
    print("================================================================")
    print("                                                                ")
    print("Skrip ini menghasilkan wallet BEP-20 secara acak menggunakan    ") 
    print("seed phrase BIP39. Setiap wallet memiliki address, seed phrase, ") 
    print("dan private key yang aman. Data wallet akan disimpan dalam      ")
    print("file wallet.txt dan hanya address yang disimpan dalam file      ")
    print("address.txt.                                                    ")
    print("                                                                ")
    print("            Github: \033[94mhttps://github.com/najibyahya\033[0m               ")    
    print("              Telegram: \033[94mhttps://t.me/andraz404\033[0m                   ")
    print("                                                                ")
    print("================================================================")

    num_wallets = int(input("\nMasukkan jumlah wallet yang ingin dibuat: "))

    with open("wallet.txt", "a") as wallet_file, open("address.txt", "a") as address_file:
        for i in range(num_wallets):
            seed_phrase, private_key, address = generate_wallet()

            wallet_file.write(f"{address} // {seed_phrase} // {private_key}\n")
            address_file.write(f"{address}\n")

            print(f"\n\033[93mWallet {i+1}\033[0m")
            print(f"\033[94mAddress     : \033[92m{address}\033[0m")
            print(f"\033[94mSeed Phrase : \033[92m{seed_phrase}\033[0m")
            print(f"\033[94mPrivate Key : \033[92m{private_key}\033[0m")

    print("\n\033[93mAddress, Seed Phrase & Private Key » wallet.txt")
    print("Address Only » address.txt\033[0m\n")

if __name__ == "__main__":
    main()