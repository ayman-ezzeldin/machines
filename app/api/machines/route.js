import { connectDB } from "@/lib/db";
import Machine from "@/models/Machine";

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const newMachine = await Machine.create(body);
  return Response.json(newMachine);
}
