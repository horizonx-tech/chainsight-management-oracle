// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./interfaces/IOracle.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Oracle is IOracle, Initializable {
    uint64 public version;
    bytes32 public constant DEFAULT_KEY = 0x0;

    string public constant E_LENGTH_MISMATCH = "data and keys length mismatch";

    mapping(address => mapping(bytes32 => Value)) public data;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize() external initializer {
        version = 1;
    }

    function updateStateBulk(
        bytes[] calldata _data,
        bytes32[] calldata keys
    ) external override {
        require(_data.length == keys.length, E_LENGTH_MISMATCH);
        uint64 timestamp = _blockTimestamp();
        for (uint256 i = 0; i < _data.length; i++) {
            _updateState(_data[i], keys[i], timestamp);
        }
    }

    function updateStateByKey(
        bytes calldata _data,
        bytes32 key
    ) external override {
        _updateState(_data, key);
    }

    function updateState(bytes calldata _data) external override {
        _updateState(_data, DEFAULT_KEY);
    }

    function readAsStringWithTimestamp(
        address sender,
        bytes32 key
    ) external view override returns (string memory, uint64) {
        return _readAsString(sender, key);
    }

    function readAsUint256WithTimestamp(
        address sender,
        bytes32 key
    ) external view override returns (uint256, uint64) {
        return _readAsUint256(sender, key);
    }

    function readAsUint128WithTimestamp(
        address sender,
        bytes32 key
    ) external view override returns (uint128, uint64) {
        return _readAsUint128(sender, key);
    }

    function readAsUint64WithTimestamp(
        address sender,
        bytes32 key
    ) external view override returns (uint64, uint64) {
        return _readAsUint64(sender, key);
    }

    function readAsInt256WithTimestamp(
        address sender,
        bytes32 key
    ) external view override returns (int256, uint64) {
        return _readAsInt256(sender, key);
    }

    function readAsInt128WithTimestamp(
        address sender,
        bytes32 key
    ) external view override returns (int128, uint64) {
        return _readAsInt128(sender, key);
    }

    function readAsInt64WithTimestamp(
        address sender,
        bytes32 key
    ) external view override returns (int64, uint64) {
        return _readAsInt64(sender, key);
    }

    function readAsStringByKey(
        address sender,
        bytes32 key
    ) external view override returns (string memory) {
        (string memory value, ) = _readAsString(sender, key);
        return value;
    }

    function readAsUint256ByKey(
        address sender,
        bytes32 key
    ) external view override returns (uint256) {
        (uint256 value, ) = _readAsUint256(sender, key);
        return value;
    }

    function readAsUint128ByKey(
        address sender,
        bytes32 key
    ) external view override returns (uint128) {
        (uint128 value, ) = _readAsUint128(sender, key);
        return value;
    }

    function readAsUint64ByKey(
        address sender,
        bytes32 key
    ) external view override returns (uint64) {
        (uint64 value, ) = _readAsUint64(sender, key);
        return value;
    }

    function readAsInt256ByKey(
        address sender,
        bytes32 key
    ) external view override returns (int256) {
        (int256 value, ) = _readAsInt256(sender, key);
        return value;
    }

    function readAsInt128ByKey(
        address sender,
        bytes32 key
    ) external view override returns (int128) {
        (int128 value, ) = _readAsInt128(sender, key);
        return value;
    }

    function readAsInt64ByKey(
        address sender,
        bytes32 key
    ) external view override returns (int64) {
        (int64 value, ) = _readAsInt64(sender, key);
        return value;
    }

    function readAsString(
        address sender
    ) external view override returns (string memory) {
        (string memory value, ) = _readAsString(sender, DEFAULT_KEY);
        return value;
    }

    function readAsUint256(
        address sender
    ) external view override returns (uint256) {
        (uint256 value, ) = _readAsUint256(sender, DEFAULT_KEY);
        return value;
    }

    function readAsUint128(
        address sender
    ) external view override returns (uint128) {
        (uint128 value, ) = _readAsUint128(sender, DEFAULT_KEY);
        return value;
    }

    function readAsUint64(
        address sender
    ) external view override returns (uint64) {
        (uint64 value, ) = _readAsUint64(sender, DEFAULT_KEY);
        return value;
    }

    function readAsInt256(
        address sender
    ) external view override returns (int256) {
        (int256 value, ) = _readAsInt256(sender, DEFAULT_KEY);
        return value;
    }

    function readAsInt128(
        address sender
    ) external view override returns (int128) {
        (int128 value, ) = _readAsInt128(sender, DEFAULT_KEY);
        return value;
    }

    function readAsInt64(
        address sender
    ) external view override returns (int64) {
        (int64 value, ) = _readAsInt64(sender, DEFAULT_KEY);
        return value;
    }

    function _updateState(bytes calldata _data, bytes32 key) internal {
        _updateState(_data, key, _blockTimestamp());
    }

    function _updateState(
        bytes calldata _data,
        bytes32 key,
        uint64 timestamp
    ) internal {
        data[msg.sender][key] = Value(_data, timestamp);
        emit StateUpdated(msg.sender, _data, key);
    }

    function _readAsString(
        address sender,
        bytes32 key
    ) internal view returns (string memory, uint64) {
        Value memory value = data[sender][key];
        return (abi.decode(value.data, (string)), value.timestamp);
    }

    function _readAsUint256(
        address sender,
        bytes32 key
    ) internal view returns (uint256, uint64) {
        Value memory value = data[sender][key];
        return (abi.decode(value.data, (uint256)), value.timestamp);
    }

    function _readAsUint128(
        address sender,
        bytes32 key
    ) internal view returns (uint128, uint64) {
        Value memory value = data[sender][key];
        return (abi.decode(value.data, (uint128)), value.timestamp);
    }

    function _readAsUint64(
        address sender,
        bytes32 key
    ) internal view returns (uint64, uint64) {
        Value memory value = data[sender][key];
        return (abi.decode(value.data, (uint64)), value.timestamp);
    }

    function _readAsInt256(
        address sender,
        bytes32 key
    ) internal view returns (int256, uint64) {
        Value memory value = data[sender][key];
        return (abi.decode(value.data, (int256)), value.timestamp);
    }

    function _readAsInt128(
        address sender,
        bytes32 key
    ) internal view returns (int128, uint64) {
        Value memory value = data[sender][key];
        return (abi.decode(value.data, (int128)), value.timestamp);
    }

    function _readAsInt64(
        address sender,
        bytes32 key
    ) internal view returns (int64, uint64) {
        Value memory value = data[sender][key];
        return (abi.decode(value.data, (int64)), value.timestamp);
    }

    function _blockTimestamp() internal view returns (uint64) {
        return uint64(block.timestamp);
    }
}
