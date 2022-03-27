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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Network = void 0;
const types_1 = require("@web3-react/types");
function parseChainId(chainId) {
    return Number.parseInt(chainId, 16);
}
class Network extends types_1.Connector {
    /**
     * @param urlMap - A mapping from chainIds to RPC urls.
     * @param connectEagerly - A flag indicating whether connection should be initiated when the class is constructed.
     * @param defaultChainId - The chainId to connect to if connectEagerly is true.
     */
    constructor(actions, urlMap, connectEagerly = false, defaultChainId = Number(Object.keys(urlMap)[0])) {
        super(actions);
        this.providerCache = {};
        if (connectEagerly && typeof window === 'undefined') {
            throw new Error('connectEagerly = true is invalid for SSR, instead use the activate method in a useEffect');
        }
        this.urlMap = Object.keys(urlMap).reduce((accumulator, chainId) => {
            const urls = urlMap[Number(chainId)];
            accumulator[Number(chainId)] = Array.isArray(urls) ? urls : [urls];
            return accumulator;
        }, {});
        this.defaultChainId = defaultChainId;
        if (connectEagerly)
            void this.activate();
    }
    isomorphicInitialize(chainId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.providerCache[chainId])
                return this.providerCache[chainId];
            return (this.providerCache[chainId] = Promise.all([
                Promise.resolve().then(() => __importStar(require('@ethersproject/providers'))).then(({ JsonRpcProvider, FallbackProvider }) => ({
                    JsonRpcProvider,
                    FallbackProvider,
                })),
                Promise.resolve().then(() => __importStar(require('@ethersproject/experimental'))).then(({ Eip1193Bridge }) => Eip1193Bridge),
            ]).then(([{ JsonRpcProvider, FallbackProvider }, Eip1193Bridge]) => {
                const urls = this.urlMap[chainId];
                const providers = urls.map((url) => new JsonRpcProvider(url, chainId));
                return new Eip1193Bridge(providers[0].getSigner(), providers.length === 1 ? providers[0] : new FallbackProvider(providers));
            }));
        });
    }
    /**
     * Initiates a connection.
     *
     * @param desiredChainId - The desired chain to connect to.
     */
    activate(desiredChainId = this.defaultChainId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.provider)
                this.actions.startActivation();
            this.provider = yield this.isomorphicInitialize(desiredChainId);
            return this.provider
                .request({ method: 'eth_chainId' })
                .then((chainId) => {
                this.actions.update({ chainId: parseChainId(chainId), accounts: [] });
            })
                .catch((error) => {
                this.actions.reportError(error);
            });
        });
    }
}
exports.Network = Network;
