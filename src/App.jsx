import TraceabilityAbi from "./contracts/Traceability.json";
import { useWallet } from "./hooks/useWallet";
import RegisterOrganization from "./components/RegisterOrganization";
import AddEvent from "./components/AddEvent";
import AddEventsBatch from "./components/AddEventsBatch";
import HistoryViewer from "./components/HistoryViewer";

const CONTRACT_ADDRESS = "0x700b6A60ce7EaaEA56F065753d8dcB9653dbAD35";

function App() {
  const { account, contract, connectWallet, error } = useWallet(TraceabilityAbi, CONTRACT_ADDRESS);

  return (
    <div className="App">
      <h1>Traceability Dapp</h1>
      {!account && <button onClick={connectWallet}>Connect Wallet</button>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {account && contract && (
        <>
          <p>Connected as: {account}</p>
          <RegisterOrganization contract={contract} />
          <AddEvent contract={contract} />
          <AddEventsBatch contract={contract} />
          <HistoryViewer contract={contract} />
        </>
      )}
    </div>
  );
}

export default App;
