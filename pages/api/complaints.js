import connectToDatabase from '@/lib/mongoose';
import Complaint from '@/models/Complaint';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    try {
      const complaints = await Complaint.find({}).sort({ createdAt: -1 });
      res.status(200).json(complaints);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching complaints' });
    }
  }

  else if (req.method === 'POST') {
    try {
      const complaint = await Complaint.create(req.body);
      res.status(201).json(complaint);
    } catch (error) {
      res.status(400).json({ message: 'Error creating complaint' });
    }
  }

  else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
