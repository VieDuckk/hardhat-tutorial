// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StakingPool {
    ERC20 public token;
    uint256 public annualInterestRate = 10; // 10% APY
    uint256 public stakingDuration = 365 days; // 1 year

    struct Stake {
        uint256 amount;
        uint256 startTime;
    }

    mapping(address => Stake) public stakes;

    constructor(address _token) {
        token = ERC20(_token);
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Cannot stake 0");
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        Stake storage stakeData = stakes[msg.sender];
        if (stakeData.amount > 0) {
            // Existing stake: calculate reward
            uint256 reward = calculateReward(msg.sender);
            if (reward > 0) {
                token.transfer(msg.sender, reward);
            }
        }

        stakeData.amount += amount;
        stakeData.startTime = block.timestamp;
    }

    function unstake() external {
        Stake storage stakeData = stakes[msg.sender];
        require(stakeData.amount > 0, "No stake found");
        require(block.timestamp >= stakeData.startTime + stakingDuration, "Stake duration not yet met");

        uint256 reward = calculateReward(msg.sender);
        uint256 totalAmount = stakeData.amount + reward;

        stakeData.amount = 0;
        stakeData.startTime = 0;

        require(token.transfer(msg.sender, totalAmount), "Transfer failed");
    }

    function calculateReward(address staker) public view returns (uint256) {
        Stake storage stakeData = stakes[staker];
        uint256 duration = block.timestamp - stakeData.startTime;
        if (duration < stakingDuration) return 0;

        // Calculate the number of years
        uint256 nam = duration / 365 days;
        uint256 reward = (stakeData.amount * annualInterestRate * nam) / 100;
        return reward;
    }
}
