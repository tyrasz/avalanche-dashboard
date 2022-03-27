import type { Networkish } from '@ethersproject/networks';
import type { Connector } from '@web3-react/types';
import type { ReactNode } from 'react';
import type { Web3ReactHooks, Web3ReactPriorityHooks } from './hooks';
declare type Web3ContextType = {
    connector: ReturnType<Web3ReactPriorityHooks['usePriorityConnector']>;
    chainId: ReturnType<Web3ReactPriorityHooks['usePriorityChainId']>;
    accounts: ReturnType<Web3ReactPriorityHooks['usePriorityAccounts']>;
    isActivating: ReturnType<Web3ReactPriorityHooks['usePriorityIsActivating']>;
    error: ReturnType<Web3ReactPriorityHooks['usePriorityError']>;
    account: ReturnType<Web3ReactPriorityHooks['usePriorityAccount']>;
    isActive: ReturnType<Web3ReactPriorityHooks['usePriorityIsActive']>;
    provider: ReturnType<Web3ReactPriorityHooks['usePriorityProvider']>;
    ENSNames: ReturnType<Web3ReactPriorityHooks['usePriorityENSNames']>;
    ENSName: ReturnType<Web3ReactPriorityHooks['usePriorityENSName']>;
};
export declare function Web3ReactProvider({ children, connectors, network, lookupENS, }: {
    children: ReactNode;
    connectors: [Connector, Web3ReactHooks][];
    network?: Networkish;
    lookupENS?: boolean;
}): JSX.Element;
export declare function useWeb3React(): Web3ContextType;
export {};
