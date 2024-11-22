import connectToDatabase from '@/lib/mongoose';
import Intern from '@/models/Intern';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    try {
      const interns = await Intern.find({}).select('name TeamName mobile');
      res.status(200).json(interns);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch interns' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}