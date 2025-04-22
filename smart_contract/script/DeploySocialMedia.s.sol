// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {Social} from "../src/Social.sol";
import {Script} from "forge-std/Script.sol";

contract DeploySocialMedia is Script {
    
    function run() external returns (Social) {
        vm.startBroadcast();
        Social social = new Social();
        vm.stopBroadcast();
        return social;
    }
}