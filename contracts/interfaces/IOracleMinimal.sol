// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface IOracleMinimal {
    struct Value {
        bytes data;
        uint64 timestamp;
    }

    event StateUpdated(address indexed sender, bytes data, bytes32 indexed key);

    function updateStateBulk(
        bytes[] calldata data,
        bytes32[] calldata keys
    ) external;

    function readAsUint256WithTimestamp(
        address sender,
        bytes32 key
    ) external view returns (uint256, uint64);
}
