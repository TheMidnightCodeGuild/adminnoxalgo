import connectToDatabase from '@/lib/mongoose';
import Intern from '@/models/Intern';

export default async function handler(req, res) {
  await connectToDatabase();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const intern = await Intern.findById(id);
      if (!intern) {
        return res.status(404).json({ error: 'Intern not found' });
      }
      res.status(200).json(intern);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch intern details' });
    }
  } 
  else if (req.method === 'PUT') {
    try {
      const updatedIntern = await Intern.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true, runValidators: true }
      );
      if (!updatedIntern) {
        return res.status(404).json({ error: 'Intern not found' });
      }
      res.status(200).json(updatedIntern);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update intern details' });
    }
  }
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}