// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./interfaces/IOracle.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Oracle is IOracle, Initializable {
    uint64 public version;
    bytes32 public constant DEFAULT_KEY = 0x0;

    string public constant E_LENGTH_MISMATCH = "data and keys length mismatch";

    mapping(address => mapping(bytes32 => bytes)) public data;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize() external initializer {
        version = 1;
    }

    function updateState(
        bytes[] calldata _data,
        bytes32[] calldata keys
    ) external override {
        require(_data.length == keys.length, E_LENGTH_MISMATCH);
        for (uint256 i = 0; i < _data.length; i++) {
            _updateState(_data[i], keys[i]);
        }
    }

    function updateState(bytes calldata _data, bytes32 key) external override {
        _updateState(_data, key);
    }

    function updateState(bytes calldata _data) external override {
        _updateState(_data, DEFAULT_KEY);
    }

    function readAsString(
        address sender,
        bytes32 key
    ) external view override returns (string memory) {
        return _readAsString(sender, key);
    }

    function readAsUint256(
        address sender,
        bytes32 key
    ) external view override returns (uint256) {
        return _readAsUint256(sender, key);
    }

    function readAsUint128(
        address sender,
        bytes32 key
    ) external view override returns (uint128) {
        return _readAsUint128(sender, key);
    }

    function readAsUint64(
        address sender,
        bytes32 key
    ) external view override returns (uint64) {
        return _readAsUint64(sender, key);
    }

    function readAsInt256(
        address sender,
        bytes32 key
    ) external view override returns (int256) {
        return _readAsInt256(sender, key);
    }

    function readAsInt128(
        address sender,
        bytes32 key
    ) external view override returns (int128) {
        return _readAsInt128(sender, key);
    }

    function readAsInt64(
        address sender,
        bytes32 key
    ) external view override returns (int64) {
        return _readAsInt64(sender, key);
    }

    function readAsString(
        address sender
    ) external view override returns (string memory) {
        return _readAsString(sender, DEFAULT_KEY);
    }

    function readAsUint256(
        address sender
    ) external view override returns (uint256) {
        return _readAsUint256(sender, DEFAULT_KEY);
    }

    function readAsUint128(
        address sender
    ) external view override returns (uint128) {
        return _readAsUint128(sender, DEFAULT_KEY);
    }

    function readAsUint64(
        address sender
    ) external view override returns (uint64) {
        return _readAsUint64(sender, DEFAULT_KEY);
    }

    function readAsInt256(
        address sender
    ) external view override returns (int256) {
        return _readAsInt256(sender, DEFAULT_KEY);
    }

    function readAsInt128(
        address sender
    ) external view override returns (int128) {
        return _readAsInt128(sender, DEFAULT_KEY);
    }

    function readAsInt64(
        address sender
    ) external view override returns (int64) {
        return _readAsInt64(sender, DEFAULT_KEY);
    }

    function _updateState(bytes calldata _data, bytes32 key) internal {
        data[msg.sender][key] = _data;
        emit StateUpdated(msg.sender, _data);
    }

    function _readAsString(
        address sender,
        bytes32 key
    ) internal view returns (string memory) {
        return abi.decode(data[sender][key], (string));
    }

    function _readAsUint256(
        address sender,
        bytes32 key
    ) internal view returns (uint256) {
        return abi.decode(data[sender][key], (uint256));
    }

    function _readAsUint128(
        address sender,
        bytes32 key
    ) internal view returns (uint128) {
        return abi.decode(data[sender][key], (uint128));
    }

    function _readAsUint64(
        address sender,
        bytes32 key
    ) internal view returns (uint64) {
        return abi.decode(data[sender][key], (uint64));
    }

    function _readAsInt256(
        address sender,
        bytes32 key
    ) internal view returns (int256) {
        return abi.decode(data[sender][key], (int256));
    }

    function _readAsInt128(
        address sender,
        bytes32 key
    ) internal view returns (int128) {
        return abi.decode(data[sender][key], (int128));
    }

    function _readAsInt64(
        address sender,
        bytes32 key
    ) internal view returns (int64) {
        return abi.decode(data[sender][key], (int64));
    }
}
