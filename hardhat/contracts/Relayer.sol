// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Relayer {
    address public owner;             // The address of the contract owner.
    address[] private depositors;     // An array of addresses of users who have made deposits.
    uint256 private rootCount = 0;    // A counter to track the number of root hashes added.

    uint256 public totalSupply;       // Total supply of shares in the contract.
    mapping(address => uint256) public balanceOf; // Mapping of user addresses to their share balances.
    mapping(uint256 => bytes32) private _roots;   // Mapping of root hashes with their corresponding IDs.

    event RootAdded(uint id, bytes32 root);  // Event emitted when a new root hash is added.
    event Received(address indexed sender, uint256 value);  // Event emitted when the contract receives ETH.
    event Transfer(address indexed from, address indexed to, uint256 amount);  // Event emitted on ETH transfers.

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;  // The contract owner is set to the creator of the contract.
    }

    // Function to add a new root hash.
    function addRoot(bytes32 _root) external onlyOwner {
        rootCount++;
        _roots[rootCount] = _root;
        emit RootAdded(rootCount, _root);
    }

    // Function to retrieve a root hash by its ID.
    function getRoot(uint id) public view returns (bytes32) {
        require(id > 0 && id <= rootCount, "Invalid root ID");
        return _roots[id];
    }

    // Function to allow users to deposit ETH and receive shares.
    function deposit() external payable {
        uint256 shares = msg.value;
        _mint(msg.sender, shares);
        depositors.push(msg.sender);
    }

    // Function to allow users to withdraw ETH based on the number of shares.
    function withdraw(uint256 _shares) external {
        uint256 ethPerShare = address(this).balance / totalSupply;
        uint256 amount = _shares * ethPerShare;

        require(address(this).balance >= amount, "Not enough balance in the contract");
        _burn(msg.sender, _shares);

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "ETH transfer failed");
    }

    // Function to mint new shares and update user balances.
    function _mint(address _to, uint256 _shares) private {
        totalSupply += _shares;
        balanceOf[_to] += _shares;
    }

    // Function to burn shares and update user balances.
    function _burn(address _from, uint256 _shares) private {
        totalSupply -= _shares;
        balanceOf[_from] -= _shares;
    }

    // Internal function to transfer ETH to a specified address.
    function _transfer(address payable to, uint256 _amount) internal returns (bool) {
        require(to != address(0), 'Error: "to" address must not be 0.');
        require(_amount > 0, 'Error: value must be greater than 0.');
        require(address(this).balance >= _amount, 'Error: not enough balance.');
        require(depositors.length > 0, "No depositors to transfer ETH to");

        uint256 depositorsCount = depositors.length;

        for (uint256 i = 0; i < depositorsCount; i++) {
            address depositor = depositors[i];
            uint256 sharesToDeduct = (_amount * balanceOf[depositor]) / totalSupply;
            balanceOf[depositor] -= sharesToDeduct;
        }

        (bool transferSuccess, ) = to.call{value: _amount}("");
        require(transferSuccess, 'Transfer to the recipient address failed');

        emit Transfer(owner, to, _amount);
        return true;
    }

    // Function to transfer ETH to a specified address, with signature verification.
    function verifiedTransfer(address payable to, bytes32 _root, uint256 _amount) external onlyOwner returns (bool success) {
        uint256 count = rootCount;

        if (_root == getRoot(count)) {
            success = _transfer(to, _amount);
            return success;
        }
        revert('Error: Invalid signers.');
    }

    // Fallback function to receive incoming ETH.
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
}
