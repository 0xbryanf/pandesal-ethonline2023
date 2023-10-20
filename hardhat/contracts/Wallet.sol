// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Base {
    using SafeERC20 for IERC20;
    
    address payable private owner;

    mapping (address => uint256) private _balances;
    mapping(address => bool) public supportedTokens;

    event Deposit(address indexed sender, uint256 amount);
    event Received(address indexed sender, uint256 value);
    event Withdraw(address indexed receiver, uint256 amount);
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

    function addToken(address token) external onlyOwner { 
        require(token != address(0), "Invalid token address");
        require(!supportedTokens[token], "Token already supported");
        supportedTokens[token] = true;
    }

    function removeToken(address token) external onlyOwner {
        require(token != address(0), "Invalid token address");
        require(supportedTokens[token], "Token not supported");
        supportedTokens[token] = false;
    }

    function transferToken(address token, address to, uint256 value) external onlyOwner returns (bool) { 
        require(token != address(0), "Invalid token address"); 
        require(to != address(0), "Invalid recipient address"); 
        require(value > 0, "Invalid value"); 
        require(supportedTokens[token], "Token not supported"); 
        IERC20(token).safeTransfer(to, value); 
        emit Transfer(address(this), to, value); 
        return true;
    }

    function transferTokenFrom(address token, address from, address to, uint256 value) external onlyOwner returns (bool) { 
        require(token != address(0), "Invalid token address"); 
        require(from != address(0), "Invalid sender address"); 
        require(to != address(0), "Invalid recipient address"); 
        require(value > 0, "Invalid value"); 
        require(supportedTokens[token], "Token not supported"); 
        IERC20(token).safeTransferFrom(from, to, value); 
        emit Transfer(from, to, value);
        return true;
    }

    function withdrawToken(address token, uint256 value) external onlyOwner returns (bool) {
        require(token != address(0), "Invalid token address");
        require(value > 0, "Invalid value");
        require(supportedTokens[token], "Token not supported");
        IERC20(token).safeTransfer(owner, value);
        emit Withdraw(owner, value);
        return true;
    }

    function approveToken(address token, address spender, uint256 value) external onlyOwner {
        require(token != address(0), "Invalid token address");
        require(spender != address(0), "Invalid spender address");
        require(supportedTokens[token], "Token not supported");
        IERC20(token).approve(spender, value);
    }

    function getTokenAllowance(address token, address _owner, address spender) external view returns (uint256) {
        require(token != address(0), "Invalid token address");
        require(_owner != address(0), "Invalid owner address");
        require(spender != address(0), "Invalid spender address");
        require(supportedTokens[token], "Token not supported");
        return IERC20(token).allowance(_owner, spender);
    }

    function spendTokenAllowance(address token, address _owner, address to, uint256 value) external onlyOwner {
        require(token != address(0), "Invalid token address");
        require(_owner != address(0), "Invalid owner address");
        require(to != address(0), "Invalid recipient address");
        require(value > 0, "Invalid value");
        require(supportedTokens[token], "Token not supported");
        IERC20(token).safeTransferFrom(_owner, to, value);
        emit Transfer(_owner, to, value);
    }

    function getTokenBalance(address token) external view returns (uint256) {
        require(token != address(0), "Invalid token address");
        require(supportedTokens[token], "Token not supported");
        return IERC20(token).balanceOf(address(this));
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function transfer(address payable to, uint256 value) external onlyOwner returns (bool) {
        require(to != address(0), 'Error: "to" address must not be 0.');
        require(value > 0, 'Error: value must be greater than 0.');
        require(value <= address(this).balance, 'Error: not enough balance.');

        (bool success, ) = to.call{value: value}("");
        require(success, 'Transfer failed');

        emit Transfer(owner, to, value);
        return true;
    }

    function deposit() external payable returns (bool) {
        require(msg.value > 0, 'Error: value must be greater than 0.');
        emit Deposit(msg.sender, msg.value);
        return true;
    }

    function withdraw(uint256 amount) external onlyOwner returns (bool) {
        require(amount > 0, 'Error: amount must be greater than 0.');
        require(amount <= address(this).balance, 'Error: not enough balance in the contract.');

        (bool success, ) = owner.call{value: amount}("");
        require(success, 'Withdrawal failed');

        emit Withdraw(owner, amount);
        return true;
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
}