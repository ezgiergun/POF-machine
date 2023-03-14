import {
  Metaplex,
  keypairIdentity,
  toBigNumber,
  sol,
  toDateTime,
} from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";
import { loadKeypair } from "/home/ezgiergun/grz_sol/candyv3/utils";
import fs from "fs";

async function main() {
  const authority = loadKeypair(
    "Ezgi8148M87RSNnJ5DhJcYmE6a9Jhe6iZKCCvY2PrccF.json"
  );

  const connection = new Connection(clusterApiUrl("mainnet-beta"));
  const metaplex = new Metaplex(connection);
  metaplex.use(keypairIdentity(authority));

  const candyMachine = await metaplex.candyMachines().findByAddress({
    address: new PublicKey("4VJFkvDXBH44QwCjaaAEZSxRfwqwAix4WynGGQaE3D2f"),
  });
  function loadKeypair(filename: string): Keypair {
    const secret = JSON.parse(fs.readFileSync(filename).toString()) as number[];
    const secretKey = Uint8Array.from(secret);
    return Keypair.fromSecretKey(secretKey);
  }

  const mint = loadKeypair("DevrjLbaTMZf8LEn7mkZQJ8rSVeMpoZwe3JvMrqn8ajo.json");

  const resp = await metaplex.candyMachines().mint({
    candyMachine,
    collectionUpdateAuthority: authority.publicKey,
    mint: mint,
  });
  console.log(resp.response.signature);
  console.log(resp.nft.name);
}
main();
