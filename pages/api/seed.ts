import User from '../../models/User';
import data from '../../utils/data';
import db from '../../utils/db';
import Plants from '../../models/Plant';

const handler = async (req: any, res: any) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Plants.deleteMany();
  await Plants.insertMany(data.plants);
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
};
export default handler;
