import { useState } from "react";

export default function AddEvent({ contract }) {
  const [code, setCode] = useState("");
  const [info, setInfo] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!code || !info || !lat || !lon) return alert("Fill all fields");

    const latInt = Math.floor(Number(lat) * 1e6);
    const lonInt = Math.floor(Number(lon) * 1e6);

    try {
      setLoading(true);
      const tx = await contract.addEvent(code, info, latInt, lonInt);
      await tx.wait();
      alert("Event added successfully!");
      setCode(""); setInfo(""); setLat(""); setLon("");
    } catch (err) {
      console.error(err);
      alert("Error adding event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add Event</h2>
      <input placeholder="Code" value={code} onChange={e => setCode(e.target.value)} />
      <input placeholder="Info" value={info} onChange={e => setInfo(e.target.value)} />
      <input placeholder="Latitude (decimal)" value={lat} onChange={e => setLat(e.target.value)} />
      <input placeholder="Longitude (decimal)" value={lon} onChange={e => setLon(e.target.value)} />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Sending..." : "Add Event"}
      </button>
    </div>
  );
}
