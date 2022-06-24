const hre = require("hardhat");
const ethers = hre.ethers
const formAbi = require("../src/artifacts/contracts/DigitalCountry.sol/BoeingFormOfGovernment.json")
const newsAbi = require("../src/artifacts/contracts/DigitalCountry.sol/News.json")
// const countryAbi = require("../artifacts/contracts/DigitalCountry.sol/DigitalCountry.json")

async function main() {

  const [signer] = await ethers.getSigners()

  const Contract = await hre.ethers.getContractFactory("DigitalCountry");
  const contract = await Contract.deploy("most better country", "Leva");

  await contract.deployed();

  console.log("contract deployed to:", contract.address);

  const getFormAddress = await contract.getFormAddress()
  const formContract = new ethers.Contract(getFormAddress, formAbi.abi, signer);

  console.log("formContract deployed to:", formContract.address);


  const getNewsAddress = await formContract.getNewsAddress()
  const newsContract = new ethers.Contract(getNewsAddress, newsAbi.abi, signer);

  console.log("newsContract deployed to:", newsContract.address);

}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
