// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./interfaces/IOracleMinimal.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract OracleMinimal is IOracleMinimal, Initializable {
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

    function readAsUint256WithTimestamp(
        address sender,
        bytes32 key
    ) external view override returns (uint256, uint64) {
        return _readAsUint256(sender, key);
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

    function _readAsUint256(
        address sender,
        bytes32 key
    ) internal view returns (uint256, uint64) {
        Value memory value = data[sender][key];
        return (abi.decode(value.data, (uint256)), value.timestamp);
    }

    function _blockTimestamp() internal view returns (uint64) {
        return uint64(block.timestamp);
    }
}
