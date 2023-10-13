// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ContractFactory {
    event Deploy(address addr);

    function deploy(bytes memory bytecode_, bytes32 salt_) external returns (address) {
        address addr;

        assembly {
            addr := create2(
                0,
                add(bytecode_, 0x20),
                mload(bytecode_),
                salt_
            )

            if iszero(extcodesize(addr)) {
                revert(0,0)
            }
        }

        emit Deploy(addr);
        return addr;
    }
}