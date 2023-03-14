import { DriverNotProvidedError } from "@metaplex-foundation/js";
import { ShadowFile, ShdwDrive } from "@shadow-drive/sdk";
import { Connection, clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";
import fs from "fs";
import { loadKeypair } from "./utils";
import anchor from "@project-serum/anchor";

const connection = new Connection(clusterApiUrl("mainnet-beta"));

//Create account:
async function createAccount(): Promise<String> {
  const drive = await new ShdwDrive(connection, wallet).init();
  const resp = await drive.createStorageAccount("godev", "333MB", "v2");
  console.log(resp.transaction_signature);
  console.log(resp.shdw_bucket);
  return resp.shdw_bucket;
}
const kp = loadKeypair("./Ezgi8148M87RSNnJ5DhJcYmE6a9Jhe6iZKCCvY2PrccF.json");
const wallet = new anchor.Wallet(kp);

async function uploadAllItems() {
  const drive = await new ShdwDrive(connection, wallet).init();
  const bucket = "EmjKoEGE6H4muVFDnqwqFw6PtCHpirEktktTNe74P1Xq"; //createAccount();
  // const acct = await drive.getStorageAccount(new PublicKey(bucket));
  // console.log(acct);
  const numbers = Array.from(Array(20).keys());
  const files = numbers.map((idx) => {
    const fileBuff = fs.readFileSync(
      `/home/ezgiergun/grz_sol/art/cats/${idx + 1}.json`
    );
    const fileToUpload: ShadowFile = {
      name: idx + ".jpeg",
      file: fileBuff,
    };
    return fileToUpload;
  });
  const resp = await drive.uploadMultipleFiles(new PublicKey(bucket), files);
  resp.forEach((r) => {
    console.log(r.status);
  });
}

uploadAllItems();
