pragma solidity ^0.4.18;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/GamerGoldICO.sol";
import "../contracts/GamerGold.sol";

contract TestICO{
    GamerGold gg = GamerGold(DeployedAddresses.GamerGold());
    GamerGoldICO ico = GamerGoldICO(DeployedAddresses.GamerGoldICO());
    
    //might have to turn this into a javascript test instead of a contract based test so that the test can access the address
    //for now the companyid is manually entered into the test.
    function testAllowance() public {
        uint256 expected = 16000000000;
        uint256 allowance = gg.allowance(0x442152AB2Aa10F46D2Acd18D4275d08C2C6E537B,ico); //TODO: this should be the first address in the wallet 
        Assert.equal(allowance,expected,"allowance was not given to the ico.");
    }
}