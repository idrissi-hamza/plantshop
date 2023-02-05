import db from '@/utils/db';
import Card from '../components/Card';
import Layout from '../components/Layout';
import type { PlantType } from '../utils/data';
import Plant from '@/models/Plant';
import { AddedPlant, useStoreContext } from '@/utils/Store';
import axios from 'axios';
import { toast } from 'react-toastify';


export default function Home({ plants }: { plants: PlantType[] }) {
  const { state, dispatch } = useStoreContext();
  const { cart } = state;

  const addToCartHandler = async (plant: AddedPlant) => {
    const existItem = cart.cartItems.find((x) => x.slug === plant.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/plants/${plant._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...plant, quantity } });

    toast.success('Product added to the cart', {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  return (
    <Layout>
      <div className="min-h-[70vh] mx-auto flex flex-col">
      <h3 className="block mb-6 bg-clip-text text-transparent bg-gradient-to-r to-blue-500 from-[#b2bc83]  font-bold   text-4xl self-start mt-10">
                All Plants
              </h3>
        <ul
          className="gap-10 g-red-300 
        
        my-10 
        grid 
        md:grid-cols-2  lg:grid-cols-3
         2xl:grid-cols-4 3xl:flex flex-wrap justify-center min-h-full space"
        >
          {plants.map((plant, i) => (
            <li key={plant.slug}>
              <Card
                plant={plant}
                addToCartHandler={addToCartHandler}
              />
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
