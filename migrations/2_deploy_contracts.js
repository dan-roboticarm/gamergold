var GamerGold = artifacts.require("./GamerGold.sol");
var GamerGoldICO = artifacts.require("./GamerGoldICO.sol");

module.exports = function(deployer,network,accounts)
{
    //TODO: before deploying on main net change fake addresses to real ones.
    //dev: this is the trusted account of the company with which they can do admin things.
    var companyID = "0x442152ab2aa10f46d2acd18d4275d08c2c6e537b";
    var rate = 10000;
    var goal = 100000;
    var tokenwallet = companyID;
    var GG;

    deployer.deploy(GamerGold,companyID).then(function(){
        var starttime = web3.eth.getBlock(web3.eth.blockNumber).timestamp + 300000000;
        var endtime = starttime + 1000000;
        return deployer.deploy(GamerGoldICO, GamerGold.address, tokenwallet, rate, goal, tokenwallet, starttime, endtime);
    })
    /*deployer.then(function()
    {
        return GamerGold.new(companyID);
    }).then(function(instance)
    {
        GG = instance;
       // return GamerGoldICO.deployed(GamerGoldICO, GamerGold.address, tokenwallet,
       //     rate, goal, tokenwallet, starttime, endtime);
    });
    /*
    deploy(GamerGold, companyID).then(function(instance)
    {
        var starttime = web3.eth.getBlock(web3.eth.blockNumber).timestamp + 300000000;
        var endtime = starttime + 1000000;
        var promise = deployer.deploy(GamerGoldICO, GamerGold.address, tokenwallet,
            rate, goal, tokenwallet, starttime, endtime);
        return GamerGold;
    }).then(function(){
        return GamerGold.deployed();
    }).then(function(instance){
        var gg = instance;
        gg.approve(GamerGoldICO.address,16000000000);
    });

    */
}