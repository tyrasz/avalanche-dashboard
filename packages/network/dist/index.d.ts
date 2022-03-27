import type { Eip1193Bridge } from '@ethersproject/experimental';
import type { ConnectionInfo } from '@ethersproject/web';
import type { Actions } from '@web3-react/types';
import { Connector } from '@web3-react/types';
declare type url = string | ConnectionInfo;
export declare class Network extends Connector {
    /** {@inheritdoc Connector.provider} */
    provider: Eip1193Bridge | undefined;
    private urlMap;
    private defaultChainId;
    private providerCache;
    /**
     * @param urlMap - A mapping from chainIds to RPC urls.
     * @param connectEagerly - A flag indicating whether connection should be initiated when the class is constructed.
     * @param defaultChainId - The chainId to connect to if connectEagerly is true.
     */
    constructor(actions: Actions, urlMap: {
        [chainId: number]: url | url[];
    }, connectEagerly?: boolean, defaultChainId?: number);
    private isomorphicInitialize;
    /**
     * Initiates a connection.
     *
     * @param desiredChainId - The desired chain to connect to.
     */
    activate(desiredChainId?: number): Promise<void>;
}
export {};
