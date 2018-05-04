var GamerGold = artifacts.require("./GamerGold.sol");
var GamerGoldICO = artifacts.require("./GamerGoldICO.sol");

module.exports = function(deployer,network,accounts)
{
    //TODO: before deploying on main net change fake addresses to real ones.
    //dev: this is the trusted account of the company with which they can do admin things.
    var companyID = accounts[0]; //this should be the account that is currently being used to deploy all the contracts.
    var rate = 10000;
    var goal = 100000;
    var tokenwallet = companyID;
    var GG;
    var ICO;
    
    deployer.deploy(GamerGold,companyID).then(function(){
        var starttime = web3.eth.getBlock(web3.eth.blockNumber).timestamp + 300000000;
        var endtime = starttime + 1000000;
        GG = GamerGold;
        return deployer.deploy(GamerGoldICO, GamerGold.address, tokenwallet, rate, goal, tokenwallet, starttime, endtime).then(function()
        {
            
            console.log("gamergold object: " + GamerGold);
            GG.at(GG.address).approve(GamerGoldICO.address,16000000000);
        });
    });

}