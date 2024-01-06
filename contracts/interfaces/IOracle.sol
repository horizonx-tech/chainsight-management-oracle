// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface IOracle {
    function updateState(bytes calldata data) external;
    event StateUpdated(address indexed sender, bytes data);
    function readAsString(address sender) external view returns (string memory);
    function readAsUint256(address sender) external view returns (uint256);
    function readAsUint128 (address sender) external view returns (uint128);
    function readAsUint64 (address sender) external view returns (uint64);
    function readAsInt256(address sender) external view returns (int256);
    function readAsInt128 (address sender) external view returns (int128);
    function readAsInt64 (address sender) external view returns (int64);
}