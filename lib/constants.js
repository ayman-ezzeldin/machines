export const fakeMachines = [
  {
    id: 1,
    name: "Lathe Machine",
    status: "Active",
    location: "Workshop A",
    tasks: 2,
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Milling Machine",
    status: "Maintenance",
    location: "Workshop B",
    tasks: 2,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Drill Press",
    status: "Active",
    location: "Workshop C",
    tasks: 1,
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
  },
];

export const fakeTasks = [
  { id: 1, title: "Check oil level", machineId: 1 },
  { id: 2, title: "Clean work area", machineId: 2 },
  { id: 3, title: "Replace drill bit", machineId: 3 },
  { id: 4, title: "Inspect safety guard", machineId: 1 },
  { id: 5, title: "Lubricate gears", machineId: 2 },
];