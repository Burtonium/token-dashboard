// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { ITokenStaking } from "./ITokenStaking.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract BatchStake is Ownable {
    using SafeERC20 for IERC20;
    IERC20 public immutable TOKEN;
    ITokenStaking public immutable TOKEN_STAKING;

    constructor(address token, address tokenStaking) Ownable(msg.sender) {
        TOKEN = IERC20(token);
        TOKEN_STAKING = ITokenStaking(tokenStaking);
    }

    function stake(
        address[] calldata beneficiaries,
        uint256[] calldata amounts,
        uint32[] calldata tiers
    ) external onlyOwner {
        uint256 totalAmount = 0;
        for (uint256 i = 0; i < amounts.length; i++) {
            totalAmount += amounts[i];
        }

        // Transfer tokens from sender
        TOKEN.safeTransferFrom(msg.sender, address(this), totalAmount);

        TOKEN.approve(address(TOKEN_STAKING), totalAmount);

        for (uint256 i = 0; i < beneficiaries.length; i++) {
            TOKEN_STAKING.stake(beneficiaries[i], amounts[i], tiers[i]);
        }
    }

    function withdraw(uint256 amount) external onlyOwner {
        TOKEN.safeTransfer(msg.sender, amount);
    }
}
