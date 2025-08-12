"use client";

import { fakeMachines } from "@/lib/constants";

const statusColors = {
  Active: "bg-green-100 text-green-700",
  Maintenance: "bg-yellow-100 text-yellow-700",
  Offline: "bg-red-100 text-red-700",
};

const MachinesPage = () => {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-blue-700">Machines</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-2">
        {fakeMachines.map((machine) => (
          <div
            key={machine.id}
            onClick={()=> window.location.href = `/machines/${machine.id}`}
            className="bg-white rounded-lg shadow-md cursor-pointer overflow-hidden"
          >
            <img
              src={machine.image}
              alt={machine.name}
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{machine.name}</h2>
              <p className="text-gray-600 mb-2">Location: {machine.location}</p>
              <p className="text-gray-600 mb-2">Tasks: {machine.tasks}</p>
              <div
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  statusColors[machine.status]
                }`}
              >
                {machine.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MachinesPage;
