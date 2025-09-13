import { useState } from "react";

const Role = {
    Producer: 1,
    Warehouse: 2,
    Distributor: 3,
    Retailer: 4,
};

export default function RegisterOrganization({ contract }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState(Role.Producer); 

  const handleSubmit = async () => {
    try {
      const tx = await contract.registerOrganization(name, role);
      await tx.wait();
      alert("Organization registered!");
    } catch (err) {
      console.error(err);
      alert("Error registering organization");
    }
  };

  return (
    <div>
      <h2>Register organization</h2>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={role} onChange={(e) => setRole(Number(e.target.value))}>
        <option value={1}>Producer</option>
        <option value={2}>Warehouse</option>
        <option value={3}>Distributor</option>
        <option value={4}>Retailer</option>
      </select>
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}
