pragma solidity ^0.4.18;
import "zeppelin-solidity/contracts/crowdsale/distribution/RefundableCrowdsale.sol";
import "zeppelin-solidity/contracts/crowdsale/emission/AllowanceCrowdsale.sol";
import "zeppelin-solidity/contracts/crowdsale/validation/WhitelistedCrowdsale.sol";
import "zeppelin-solidity/contracts/crowdsale/price/IncreasingPriceCrowdsale.sol";
import "zeppelin-solidity/contracts/math/SafeMath.sol";
import "./GamerGold.sol";


/*

Two phases will collect money.
pre-ico only open to accreddited investors.
main-ico open to everyone.
six months before main ICO
whitelisted addresses
ability to change whitelisted addresses

staged 
3 stages
max tokens and price of tokens will change.
unsold tokens come back to us.

*/

contract GamerGoldICO is RefundableCrowdsale, AllowanceCrowdsale, WhitelistedCrowdsale, IncreasingPriceCrowdsale
{
    using SafeMath for uint256;
    function GamerGoldICO(
        GamerGold _token,
        address _wallet,
        uint256 _rate,
        uint256 _goal,
        address _tokenWallet,
        uint256 _startTime,
        uint256 _endTime
    ) public
    Crowdsale(_rate,_wallet,_token)
    RefundableCrowdsale(_goal)
    AllowanceCrowdsale(_tokenWallet)
    TimedCrowdsale(_startTime,_endTime)
    IncreasingPriceCrowdsale(_rate, _rate.div(2))
    {

    }
}