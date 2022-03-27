import type { Eip1193Bridge } from '@ethersproject/experimental';
import type { ConnectionInfo } from '@ethersproject/web';
import type { Actions } from '@web3-react/types';
import { Connector } from '@web3-react/types';
declare type url = string | ConnectionInfo;
export declare class Url extends Connector {
    /** {@inheritdoc Connector.provider} */
    provider: Eip1193Bridge | undefined;
    private eagerConnection?;
    private url;
    /**
     * @param url - An RPC url.
     * @param connectEagerly - A flag indicating whether connection should be initiated when the class is constructed.
     */
    constructor(actions: Actions, url: url, connectEagerly?: boolean);
    private isomorphicInitialize;
    /** {@inheritdoc Connector.activate} */
    activate(): Promise<void>;
}
export {};
