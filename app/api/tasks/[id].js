import dbConnect from '../../../lib/mongodb';
import Task from '../../../models/Task';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'PATCH') {
    try {
      const { status, issue } = req.body;
      const update = {};
      if (status) update.status = status;
      if (issue) update.issue = issue;
      const task = await Task.findByIdAndUpdate(id, update, { new: true });
      res.status(200).json(task);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  } else {
    res.status(405).end();
  }
}