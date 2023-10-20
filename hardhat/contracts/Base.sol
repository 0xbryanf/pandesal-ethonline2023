// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Base {
    address payable private owner;

    event Received(address indexed sender, uint256 value);
    
    constructor(address _owner) {
        owner = payable(_owner);
    }

    function readOwner() external view returns (address) {
        return owner;
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
}