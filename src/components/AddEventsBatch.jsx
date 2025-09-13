import { useState } from "react";

export default function AddEventsBatch({ contract }) {
  const [codes, setCodes] = useState("");
  const [info, setInfo] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!codes || !info || !lat || !lon) return alert("Fill all fields");

    const codesArray = codes.split(",").map(c => c.trim());
    const latInt = Math.floor(Number(lat) * 1e6);
    const lonInt = Math.floor(Number(lon) * 1e6);

    try {
      setLoading(true);
      const tx = await contract.addEventsBatch(codesArray, info, latInt, lonInt);
      await tx.wait();
      alert("Events added successfully!");
      setCodes(""); setInfo(""); setLat(""); setLon("");
    } catch (err) {
      console.error(err);
      alert("Error adding batch");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add Events Batch</h2>
      <input
        placeholder="Comma-separated codes"
        value={codes}
        onChange={e => setCodes(e.target.value)}
      />
      <input placeholder="Info" value={info} onChange={e => setInfo(e.target.value)} />
      <input placeholder="Latitude (decimal)" value={lat} onChange={e => setLat(e.target.value)} />
      <input placeholder="Longitude (decimal)" value={lon} onChange={e => setLon(e.target.value)} />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Sending..." : "Add Batch"}
      </button>
    </div>
  );
}
