import {
  Metaplex,
  keypairIdentity,
  toBigNumber,
  sol,
  toDateTime,
} from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";
import { loadKeypair } from "/home/ezgiergun/grz_sol/candyv3/utils";

async function main() {
  const authority = loadKeypair(
    "Ezgi8148M87RSNnJ5DhJcYmE6a9Jhe6iZKCCvY2PrccF.json"
  );

  const connection = new Connection(clusterApiUrl("mainnet-beta"));
  const metaplex = new Metaplex(connection);
  metaplex.use(keypairIdentity(authority));

  const collectionNft = new PublicKey(
    "Hq16qihY1zkw6mBMzN9h5ohgPrvSDLA633Pvsnu2LbzF"
  );
  const { candyMachine } = await metaplex.candyMachines().create({
    itemsAvailable: toBigNumber(20),
    sellerFeeBasisPoints: 0,
    collection: {
      address: collectionNft,
      updateAuthority: metaplex.identity(),
    },
    isMutable: true,
    symbol: "POF",
    maxEditionSupply: toBigNumber(0),
    creators: [{ address: authority.publicKey, share: 100 }],
    itemSettings: {
      type: "configLines",
      prefixName: "Cats:POF #$ID+1$",
      nameLength: 0,
      prefixUri:
        "https://shdw-drive.genesysgo.net/EmjKoEGE6H4muVFDnqwqFw6PtCHpirEktktTNe74P1Xq/$ID$.json",
      uriLength: 0,
      isSequential: false,
    },
    guards: {
      solPayment: { amount: sol(0.02), destination: authority.publicKey },
      startDate: { date: toDateTime("2023-03-12T01:00:02Z") },
      //All other guards are
    },
  });
  console.log(candyMachine.address.toBase58());
  // const { nft: collectionNft } = await metaplex.nfts().create({
  //   name: "Cats: Park of Freedom Trail",
  //   uri: "https://shdw-drive.genesysgo.net/EmjKoEGE6H4muVFDnqwqFw6PtCHpirEktktTNe74P1Xq/collection.json",
  //   sellerFeeBasisPoints: 0,
  //   isCollection: true,
  //   updateAuthority: authority,
  // });

  // console.log(collectionNft.address.toBase58());
}
main();
