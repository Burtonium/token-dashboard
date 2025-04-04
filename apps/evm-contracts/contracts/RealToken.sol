// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity >=0.8.20;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { ERC20Burnable } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract RealToken is ERC20, ERC20Burnable {
    constructor(address recipient) ERC20("REAL", "REAL") {
        _mint(recipient, 2000000000 * 10 ** decimals());
    }
}
