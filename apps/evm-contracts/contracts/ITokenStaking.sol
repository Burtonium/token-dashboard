// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ITokenStaking {
    function stake(address beneficiary, uint256 amount, uint32 tierIndex) external;
}
