import { getRandomNonce } from "locklift";

async function main() {
  const signer = (await locklift.keystore.getSigner("0"))!;
  const { contract: site, tx } = await locklift.factory.deployContract({
    contract: "Eversite",
    publicKey: signer.publicKey,
    constructorParams: { },
    initParams: { _randomNonce: getRandomNonce() },
    value: locklift.utils.toNano(3),
  });

  console.log(`Eversite deployed at: ${site.address.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
