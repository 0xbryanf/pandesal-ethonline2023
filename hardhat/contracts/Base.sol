// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Base {
    address immutable private _owner;
    
    constructor(address owner_) {
        _owner = owner_;
    }

    function owner() external view returns(address) {
        return _owner;
    }
}