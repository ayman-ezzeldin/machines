import dbConnect from "../../../lib/db";
import Task from "../../../models/Task";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const task = await Task.create(req.body);
      res.status(201).json(task);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  } else if (req.method === "GET") {
    // Get all tasks (optionally filter by machine or assignedTo)
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } else {
    res.status(405).end();
  }
}
