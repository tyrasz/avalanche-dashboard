import React from "react";
import ReactDOM from "react-dom";
import CoinbaseWalletCard from '../components/connectors/CoinbaseWalletCard'
import MetaMaskCard from '../components/connectors/MetaMaskCard'
import NetworkCard from '../components/connectors/NetworkCard'
import WalletConnectCard from '../components/connectors/WalletConnectCard'
import ProviderExample from '../components/ProviderExample'
import { MoralisProvider } from "react-moralis";
import { useMoralis } from "react-moralis";


export default function Home() {

  // const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

  // const login = async () => {
  //   if (!isAuthenticated) {

  //     await authenticate({signingMessage: "Log in using Moralis" })
  //       .then(function (user) {
  //         console.log("logged in user:", user);
  //         console.log(user!.get("ethAddress"));
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }
  // }

  // const logOut = async () => {
  //   await logout();
  //   console.log("logged out");
  // }

  return (

    <>
      <React.StrictMode>
        <MoralisProvider serverUrl="https://zbkup2xnvgvd.usemoralis.com:2053/server" appId="wKy1M7Jy4wfFvMj9Z2sYnnCDmux0f5MxmnQ6jvWX">
        </MoralisProvider>
      </React.StrictMode>,
      <ProviderExample />
      <div style={{ display: 'flex', flexFlow: 'wrap', fontFamily: 'sans-serif' }}>
        <MetaMaskCard />
        <WalletConnectCard />
        <CoinbaseWalletCard />
        {/* <NetworkCard /> */}
      </div>
    </>
  )
}
