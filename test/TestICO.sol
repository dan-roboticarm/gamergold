pragma solidity ^0.4.18;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/GamerGoldICO.sol";
import "../contracts/GamerGold.sol";

contract TestICO{
    GamerGold gg = GamerGold(DeployedAddresses.GamerGold());
    GamerGoldICO ico = GamerGoldICO(DeployedAddresses.GamerGoldICO());
    
    function testAllowance() public {
        uint256 expected = 16000000000;
        uint256 allowance = gg.allowance(0x442152AB2Aa10F46D2Acd18D4275d08C2C6E537B,ico);
        Assert.equal(allowance,expected,"allowance was not given to the ico.");
    }

}