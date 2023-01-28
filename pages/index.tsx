import db from '@/utils/db';
import Card from '../components/Card';
import Layout from '../components/Layout';
import data from '../utils/data';
import type { PlantType } from '../utils/data';
import Link from 'next/link';
import Plant from '@/models/Plant';

// import type { Plant } from '../utils/data';
// import Plant from '@/models/Plant';

export default function Home({ plants }: { plants: PlantType[] }) {
  return (
    <Layout>
      <div className="min-h-[70vh] mx-auto">
        <h1>Products</h1>
        <ul
          className="gap-10 g-red-300 
        
        my-10 
        grid 
        md:grid-cols-2  lg:grid-cols-3
         2xl:grid-cols-4 3xl:flex flex-wrap justify-center min-h-full space"
        >
          {plants.map((plant, i) => (
            <li key={plant.slug}>
              <Card plant={plant} />
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const plants = await Plant.find().lean();
  return {
    props: {
      plants: plants.map(db.convertDocToObj),
    },
  };
}
