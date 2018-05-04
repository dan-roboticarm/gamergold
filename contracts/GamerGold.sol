pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract GamerGold is StandardToken {
  string public name = "GamerGold";
  string public symbol = "GG";
  uint public decimals = 0;
  uint public INITIAL_SUPPLY = 60000000000;

  function GamerGold(
    address companyID
  ) public {
    totalSupply_ = INITIAL_SUPPLY;
    balances[companyID] = INITIAL_SUPPLY;
  }
}

