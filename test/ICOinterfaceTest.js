var GamerGold = artifacts.require("GamerGold");
var ICO = artifacts.require("GamerGoldICO");

contract('GamerGold',function(accounts){
    it("ballance should be given to creator of token",function(){
        return GamerGold.deployed().then(function(instance){
            return instance.balanceOf(accounts[0]);
        }).then(function(balance){
            assert.equal(balance.valueOf(),60000000000,"balance was not given.");
        });
    });

    it("allowance should be given to ICO", async () => {
        let coin = await GamerGold.deployed();
        let ico = await ICO.deployed();
        let allowance = await coin.allowance(accounts[0],ICO.address);
        assert.equal(allowance,16000000000, "ICO doesn't have an allowance." )
    });

    it("Should be able to send GG to another address.", async () => {
        expected = 314159;
        let gg = await GamerGold.deployed();
        gg.transfer(accounts[1],expected);
        balance = await gg.balanceOf(accounts[1]);
        assert.equal(balance,expected, "Something went wrong while tranfering.");
    });

    it("Only a whitelisted address can participate in the ICO", async() => {
        let gg = await GamerGold.deployed();
        let ico = await ICO.deployed();

        let balance = await gg.balanceOf(accounts[2]);
        let isOnWhitelist = await ico.whitelist.call(accounts[2]);
        assert.equal(isOnWhitelist, false, "3rd account is unexpectedly on the whitelist.");
        assert.equal(balance, 0, "Balance of 3rd account should be empty");
        //first test with a non-whitelisted account.
        try{
            await ico.buyTokens(accounts[2]);
            //this code should never be reached
            assert.failed("A non-whitelisted account was able to participate in the ICO");
        }
        catch(error){
            assert.equal(error.message,"VM Exception while processing transaction: revert", error);
        }
        assert.equal(balance, 0, "Balance of 3rd account should be empty after failed purchase.");
        
        await ico.addToWhitelist(accounts[2]);

        isOnWhitelist = await ico.whitelist.call(accounts[2]);
        assert.equal(isOnWhitelist ,true, "3rd account is not whitelisted");

        await ico.buyTokens(accounts[2],{ from: accounts[2], value: 10000});

        balance = await gg.balanceOf(accounts[2]);
        assert.equal(balance,1, "3rd account has an unexpected amount of gamergold ");


    });

});