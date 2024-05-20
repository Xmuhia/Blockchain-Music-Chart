async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    const SongRanking = await ethers.getContractFactory("SongRanking");
    const songRanking = await SongRanking.deploy();
    console.log("SongRanking deployed to:", songRanking.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  