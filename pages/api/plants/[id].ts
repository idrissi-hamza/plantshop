import db from '@/utils/db';
import Plant from '@/models/Plant';

const handler = async (req: { query: { id: any; }; }, res: { send: (arg0: any) => void; })=> {
  await db.connect();
  const plant = await Plant.findById(req.query.id);
  await db.disconnect();
  res.send(plant);
};

export default handler;
