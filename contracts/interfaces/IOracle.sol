// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./IOracleMinimal.sol";

interface IOracle is IOracleMinimal {
    function updateState(bytes calldata data) external;

    function updateStateByKey(bytes calldata data, bytes32 key) external;

    function readAsString(address sender) external view returns (string memory);

    function readAsUint256(address sender) external view returns (uint256);

    function readAsUint128(address sender) external view returns (uint128);

    function readAsUint64(address sender) external view returns (uint64);

    function readAsInt256(address sender) external view returns (int256);

    function readAsInt128(address sender) external view returns (int128);

    function readAsInt64(address sender) external view returns (int64);

    function readAsStringByKey(
        address sender,
        bytes32 key
    ) external view returns (string memory);

    function readAsUint256ByKey(
        address sender,
        bytes32 key
    ) external view returns (uint256);

    function readAsUint128ByKey(
        address sender,
        bytes32 key
    ) external view returns (uint128);

    function readAsUint64ByKey(
        address sender,
        bytes32 key
    ) external view returns (uint64);

    function readAsInt256ByKey(
        address sender,
        bytes32 key
    ) external view returns (int256);

    function readAsInt128ByKey(
        address sender,
        bytes32 key
    ) external view returns (int128);

    function readAsInt64ByKey(
        address sender,
        bytes32 key
    ) external view returns (int64);

    function readAsStringWithTimestamp(
        address sender,
        bytes32 key
    ) external view returns (string memory, uint64);

    function readAsUint128WithTimestamp(
        address sender,
        bytes32 key
    ) external view returns (uint128, uint64);

    function readAsUint64WithTimestamp(
        address sender,
        bytes32 key
    ) external view returns (uint64, uint64);

    function readAsInt256WithTimestamp(
        address sender,
        bytes32 key
    ) external view returns (int256, uint64);

    function readAsInt128WithTimestamp(
        address sender,
        bytes32 key
    ) external view returns (int128, uint64);

    function readAsInt64WithTimestamp(
        address sender,
        bytes32 key
    ) external view returns (int64, uint64);
}
