// contracts/TokenVesting.sol
// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.20;

import { TokenVesting } from "./TokenVesting.sol";

/**
 * @title MockTokenVesting
 * WARNING: use only for testing and debugging purpose
 */
contract MockTokenVesting is TokenVesting {
    uint256 private mockTime = 0;

    constructor(address token_) TokenVesting(token_) {}

    function setCurrentTime(uint256 _time) external {
        mockTime = _time;
    }

    function getCurrentTime() internal view virtual override returns (uint256) {
        return mockTime;
    }
}
