import { useEffect, useState } from "react";
import { ethers } from "ethers";

export const useWallet = (contractAbi, contractAddress) => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [error, setError] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      setError("MetaMask is not installed");
      return;
    }

    try {
      const prov = new ethers.BrowserProvider(window.ethereum);
      await prov.send("eth_requestAccounts", []);
      setProvider(prov);

      const sgn = await prov.getSigner();
      const acct = await sgn.getAddress();
      setAccount(acct);

      const traceabilityContract = new ethers.Contract(
        contractAddress,
        contractAbi,
        sgn
      );
      setContract(traceabilityContract);
    } catch (err) {
      console.error(err);
      setError("Error connecting wallet");
    }
  };

  useEffect(() => {
    if (!window.ethereum || !provider) return;

    const handleAccountsChanged = async (accounts) => {
      if (accounts.length === 0) {
        setAccount(null);
        setContract(null);
      } else {
        const sgn = provider.getSigner(accounts[0]);
        setAccount(accounts[0]);
        setContract(new ethers.Contract(contractAddress, contractAbi, sgn));
      }
    };

    const handleChainChanged = () => window.location.reload();

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, [contractAbi, contractAddress, provider]);

  return { account, contract, connectWallet, error };
};
