import { expect } from "chai";
import { ethers } from "hardhat";
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import * as contractTypes from "../typechain-types";

describe("StakingPool", function () {
      async function deployStakingPoolFixture() {
            const [owner, addr1, addr2] = await ethers.getSigners();
          
            // Deploy MyToken
            const MyToken = await ethers.getContractFactory("MyToken");
            const token = await MyToken.deploy() as contractTypes.MyToken;
            await token.deploymentTransaction();
          
            // Deploy StakingPool
            const StakingPool = await ethers.getContractFactory("StakingPool");
            const stakingPool = await StakingPool.deploy(await token.getAddress()) as contractTypes.StakingPool;
            await stakingPool.deploymentTransaction();
          
            // Transfer some tokens to addr1
            await token.transfer(addr1.address, ethers.parseEther("1000"));
            
            // Approve StakingPool to spend addr1's tokens
            await token.connect(addr1).approve(await stakingPool.getAddress(), ethers.parseEther("1000"));
          
            return { stakingPool, token, owner, addr1, addr2 };
          }

  describe("Staking", function () {
    it("Should allow staking tokens", async function () {
      const { stakingPool, addr1 } = await loadFixture(deployStakingPoolFixture);
      await stakingPool.connect(addr1).stake(ethers.parseEther("100"));
      const stake = await stakingPool.stakes(addr1.address);
      expect(stake.amount).to.equal(ethers.parseEther("100"));
    });

    it("Should not allow staking 0 tokens", async function () {
      const { stakingPool, addr1 } = await loadFixture(deployStakingPoolFixture);
      await expect(stakingPool.connect(addr1).stake(0)).to.be.revertedWith("Cannot stake 0");
    });
  });

  describe("Unstaking", function () {
      it("Should not allow unstaking before duration", async function () {
        const { stakingPool, addr1 } = await loadFixture(deployStakingPoolFixture);
        await stakingPool.connect(addr1).stake(ethers.parseEther("100"));
        await expect(stakingPool.connect(addr1).unstake()).to.be.revertedWith("Stake duration not yet met");
      });
  
      it("Should allow unstaking after duration with reward", async function () {
        const { stakingPool, token, addr1 } = await loadFixture(deployStakingPoolFixture);

        await token.transfer(stakingPool.getAddress(), ethers.parseEther("10"));
        await stakingPool.connect(addr1).stake(ethers.parseEther("100"));
        
        
        // Fast forward time by 1 year
        await time.increase(365 * 24 * 60 * 60);
  
        await stakingPool.connect(addr1).unstake();
        
        const balance = await token.balanceOf(addr1.address);

        // Expected: initial balance (1000) - staked amount (100) + staked amount (100) + reward (10) = 1010
        expect(balance).to.equal(ethers.parseEther("1010"));
      });
    });

  describe("Reward Calculation", function () {
    it("Should calculate correct reward after 1 year", async function () {
      const { stakingPool, addr1 } = await loadFixture(deployStakingPoolFixture);
      await stakingPool.connect(addr1).stake(ethers.parseEther("100"));
      
      // Fast forward time by 1 year
      await time.increase(365 * 24 * 60 * 60);

      const reward = await stakingPool.calculateReward(addr1.address);
      expect(reward).to.equal(ethers.parseEther("10")); // 10% of 100
    });
  });
});