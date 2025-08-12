import dbConnect from '../../../lib/mongodb';
import Machine from '../../../models/Machine';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { machineId, userId } = req.body;
      const machine = await Machine.findByIdAndUpdate(
        machineId,
        { assignedTo: userId },
        { new: true }
      );
      res.status(200).json(machine);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  } else {
    res.status(405).end();
  }
}