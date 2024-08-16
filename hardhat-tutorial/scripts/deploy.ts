import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const Token = await ethers.getContractFactory("MyToken");
    const token = await Token.deploy();
    await token.waitForDeployment();

    console.log("Token deployed to:", await token.getAddress());

    const StakingPool = await ethers.getContractFactory("StakingPool");
    const stakingPool = await StakingPool.deploy(await token.getAddress());
    await stakingPool.waitForDeployment();
    
    console.log("StakingPool deployed to:", await stakingPool.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
