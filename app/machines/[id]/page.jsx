"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { fakeMachines, fakeTasks } from "@/lib/constants";



export default function TasksPage() {
  const params = useParams();
  const machineId = Number(params.id);

  const machine = fakeMachines.find((m) => m.id === machineId);
  const machineTasks = fakeTasks.filter((task) => task.machineId === machineId);

  const [checked, setChecked] = useState({});

  const handleCheck = (id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!machine) {
    return (
      <div className="max-w-xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Machine not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-2">
        {machine.name} Tasks
      </h1>
      <div className="text-gray-500 mb-6">Machine ID: {machine.id}</div>
      {machineTasks.length === 0 ? (
        <div className="text-gray-600">No tasks for this machine.</div>
      ) : (
        <ul className="space-y-4">
          {machineTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center bg-white rounded-lg shadow p-4 cursor-pointer transition hover:bg-blue-50"
              onClick={() => handleCheck(task.id)}
            >
              <input
                type="checkbox"
                checked={!!checked[task.id]}
                onClick={(e) => e.stopPropagation()}
                onChange={() => handleCheck(task.id)}
                className="mr-4 w-5 h-5 accent-blue-600"
              />
              <span
                className={`font-semibold ${
                  checked[task.id] ? "line-through text-gray-400" : ""
                }`}
              >
                {task.title}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
