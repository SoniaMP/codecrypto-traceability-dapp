import { useState } from "react";

export default function HistoryViewer({ contract }) {
  const [code, setCode] = useState("");
  const [history, setHistory] = useState([]);

  console.log(history)
  const fetchHistory = async () => {
    try {
      const events = await contract.getHistory(code);
      setHistory(events.map(e => ({
        timestamp: e.timestamp,
        details: e.details,
        organization: e.organization,
        latitude: Number(e.latitude) / 1e6,
        longitude: Number(e.longitude) / 1e6
      })));
    } catch (err) {
      console.error(err);
      alert("Error loading history");
    }
  };

  return (
    <div>
      <h2>Load history</h2>
      <input placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} />
      <button onClick={fetchHistory}>View History</button>
      <ul>
        {history.map((e, idx) => (
          <li key={idx}>
            {e.timestamp} - {e.details} - {e.latitude},{e.longitude} - Org: {e.organization}
          </li>
        ))}
      </ul>
    </div>
  );
}
