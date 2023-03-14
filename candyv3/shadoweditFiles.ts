import { DriverNotProvidedError } from "@metaplex-foundation/js";
import { ShadowFile, ShdwDrive } from "@shadow-drive/sdk";
import { Connection, clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";
import fs from "fs";
const anchor = require("@project-serum/anchor");

function loadKeypair(filename: string): Keypair {
  const secret = JSON.parse(fs.readFileSync(filename).toString()) as number[];
  const secretKey = Uint8Array.from(secret);
  return Keypair.fromSecretKey(secretKey);
}
const connection = new Connection(clusterApiUrl("mainnet-beta"));
const kp = loadKeypair("./Ezgi8148M87RSNnJ5DhJcYmE6a9Jhe6iZKCCvY2PrccF.json");
const wallet = new anchor.Wallet(kp);

//Create account:
// async function createAccount(): Promise<String> {
//   const drive = await new ShdwDrive(connection, wallet).init();
//   console.log(wallet.publicKey.toBase58());
//   const resp = await drive.createStorageAccount("godev", "333MB", "v2");
//   console.log(resp.transaction_signature);
//   console.log(resp.shdw_bucket);
//   return resp.shdw_bucket;
// }

async function editFiles() {
  const drive = await new ShdwDrive(connection, wallet).init();
  const bucket = "EmjKoEGE6H4muVFDnqwqFw6PtCHpirEktktTNe74P1Xq"; //createAccount();
  const acct = await drive.getStorageAccount(new PublicKey(bucket));
  // console.log(acct);
  const fileBuff = fs.readFileSync("/home/ezgiergun/grz_sol/art/cats/20.json");
  const fileToUpload: ShadowFile = {
    name: "20.json",
    file: fileBuff,
  };
  const hey =
    "https://shdw-drive.genesysgo.net/EmjKoEGE6H4muVFDnqwqFw6PtCHpirEktktTNe74P1Xq/20.json";
  const resp = await drive.editFile(
    new PublicKey(bucket),
    hey,
    fileToUpload,
    "v2"
  );
  console.log(resp.finalized_location);
}

editFiles();
