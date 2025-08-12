"use client";
import { fakeMachines, fakeTasks } from "@/lib/constants";
import { useState } from "react";

export default function TasksPage() {
  const [checked, setChecked] = useState({});

  const handleCheck = (id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-3">
      <h1 className="text-2xl font-bold mb-6">Tasks Checklist</h1>
      <ul className="space-y-4">
        {fakeTasks.map((task) => {
          const machine = fakeMachines.find((m) => m.id === task.machineId);
          return (
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
              <div>
                <span
                  className={`font-semibold ${
                    checked[task.id] ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.title}
                </span>
                <div className="text-sm text-gray-500">
                  Machine: <span className="font-medium">{machine?.name}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
