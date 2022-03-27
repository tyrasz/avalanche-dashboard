"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWeb3React = exports.Web3ReactProvider = void 0;
const react_1 = __importStar(require("react"));
const hooks_1 = require("./hooks");
const Web3Context = (0, react_1.createContext)(undefined);
function Web3ReactProvider({ children, connectors, network, lookupENS = true, }) {
    const { usePriorityConnector, usePriorityChainId, usePriorityAccounts, usePriorityIsActivating, usePriorityError, usePriorityAccount, usePriorityIsActive, usePriorityProvider, usePriorityENSNames, usePriorityENSName, } = (0, hooks_1.getPriorityConnector)(...connectors);
    const connector = usePriorityConnector();
    const chainId = usePriorityChainId();
    const accounts = usePriorityAccounts();
    const isActivating = usePriorityIsActivating();
    const error = usePriorityError();
    const account = usePriorityAccount();
    const isActive = usePriorityIsActive();
    const provider = usePriorityProvider(network);
    const ENSNames = usePriorityENSNames(lookupENS ? provider : undefined);
    const ENSName = usePriorityENSName(lookupENS ? provider : undefined);
    return (react_1.default.createElement(Web3Context.Provider, { value: {
            connector,
            chainId,
            accounts,
            isActivating,
            error,
            account,
            isActive,
            provider,
            ENSNames,
            ENSName,
        } }, children));
}
exports.Web3ReactProvider = Web3ReactProvider;
function useWeb3React() {
    const web3 = (0, react_1.useContext)(Web3Context);
    if (!web3)
        throw Error('useWeb3React can only be used within the Web3ReactProvider component');
    return web3;
}
exports.useWeb3React = useWeb3React;
