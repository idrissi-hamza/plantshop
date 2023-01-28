import db from '@/utils/db';
import Plant from '@/models/Plant';

const handler = async (req: any, res: any) => {
  await db.connect();
  const plant = await Plant.findById(req.query.id);
  await db.disconnect();
  res.send(plant);
};

export default handler;
