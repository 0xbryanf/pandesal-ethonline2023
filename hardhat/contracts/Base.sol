// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Base {
    
    address payable private owner;
    event Received(address indexed sender, uint256 value);
    event Transfer(address indexed from, address indexed to, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }

    constructor(address _owner) {
        owner = payable(_owner);
    }

    function readOwner() external view returns (address) {
        return owner;
    }

    function transfer(address payable to) external payable onlyOwner returns (bool) {
        require(to != address(0), "Error: 'to' address must not be 0.");
        require(msg.value > 0, "Error: Amount to transfer must be greater than 0");

        to.transfer(msg.value);
        return true;
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
}