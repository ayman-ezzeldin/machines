// app/admin/add-machine.jsx
"use client";
import { useState } from "react";

export default function AddMachineForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("Active");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/machines", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, location, status }),
    });
    if (res.ok) {
      setMessage("Machine added!");
      setName("");
      setLocation("");
      setStatus("Active");
    } else {
      setMessage("Error adding machine.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Add Machine</h2>
      <input
        className="w-full border p-2 rounded"
        placeholder="Machine Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <select
        className="w-full border p-2 rounded"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Active">Active</option>
        <option value="Maintenance">Maintenance</option>
      </select>
      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
        Add Machine
      </button>
      {message && <div>{message}</div>}
    </form>
  );
}