import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { PlantType } from '../../utils/data';
import Link from 'next/link';
import Image from 'next/image';
import Specification from '../../components/Specification';
import { TbArrowBackUp } from 'react-icons/tb';
import { useStoreContext } from '@/utils/Store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import db from '@/utils/db';
import Plant from '@/models/Plant';
import axios from 'axios';

const PlantItem = (props: { plant: PlantType }) => {
  const { state, dispatch } = useStoreContext();
  const [quantity, setQuantity] = useState(1);
  const [qtyLoading, setQtyLoading] = useState(false);
  const [img, setImg] = useState('');

  const [plant, setPlant] = useState<PlantType | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { plant } = props;
    const fetchData = async () => {
      setLoading(true);
      // console.log('running');
      try {
        // const { data } = await axios.get(`/api/plants/${plant._id}`);
        setPlant(plant);
        setImg(plant.image[0]);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, [props]);

  //+ button - handle inside button
  const handleAddQuantity = async () => {
    if (plant) {
      // const { data } = await axios.get(`/api/plants/${plant._id}`);
      setQtyLoading(true);
      const { data } = await axios.get(`/api/plants/${plant._id}`);

      if (data.countInStock < quantity) {
        setQtyLoading(false);
        return toast.error('Sorry. Product is out of stock');
      }

      // if (quantity < 99 && quantity < data.countInStock) {
      setQuantity(+quantity + 1);
      setQtyLoading(false);

      // }
    }
  };

  const [totalCartQuantity, setTotalCartQuantity] = useState(0);

  useEffect(() => {
    if (plant) {
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === plant.slug
      );
      const newQuantity = existItem ? existItem.quantity + quantity : quantity;
      setTotalCartQuantity(newQuantity);
    }
  }, [plant, quantity, state.cart.cartItems]);

  const addToCartHandler = async () => {
    if (plant) {
      // const { data } = await axios.get(`/api/plants/${plant._id}`);

      const existItem = state.cart.cartItems.find(
        (item) => item.slug === plant.slug
      );
      const newQuantity = existItem ? existItem.quantity + quantity : quantity;

      ///check if the quntity in still on stock before submitting add to cart
      //double check
      const { data } = await axios.get(`/api/plants/${plant._id}`);

      if (data.countInStock < newQuantity) {
        return toast.error('Sorry. Product is out of stock');
      }

      dispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...plant, quantity: newQuantity },
      });
      toast.success('Added successfully', {
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
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex-1 text-3xl  flex items-center justify-center">
          ...Loading
        </div>
      </Layout>
    );
  }

  if (!plant) {
    return (
      <Layout>
        <div className="flex-1 text-3xl  flex items-center justify-center">
          No Plant found
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex-1 text-3xl  flex items-center justify-center">
          AN Error Ocuured
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={plant.name}
      description={plant.description}
    >
      <div className=" flex flex-col max-w-screen-xl px-10 mx-auto primary-clr font-bold">
        <Link
          href="/"
          className="mt-10  flex items-center gap-3"
        >
          <TbArrowBackUp className="text-bold text-2xl" />{' '}
          <span>Back to plants</span>
        </Link>
        <div className=" mt-10 flex flex-col justify-center items-center gap-6 lg:gap-10 lg:flex-row ">
          <div className="flex items-start gap-4">
            <div className=" flex flex-col items-center justify-between  self-stretch">
              {plant.image.slice(0, 4).map((img, i) => (
                <div
                  key={i}
                  onClick={() => setImg(img)}
                  className="w-[110px] h-[110px] relative"
                >
                  <Image
                    src={img}
                    alt="Picture of the plant"
                    // width={110}
                    // height={110}
                    // objectFit="cover"
                    fill
                  />
                </div>
              ))}
            </div>
            <div className="w-[500px] h-[500px] relative">
              <Image
                src={img}
                alt="Picture of the plant"
                // width={510}
                // height={510}
                // layout="fill"
                // objectFit="cover"
                fill
              />
            </div>
          </div>
          <div className=" flex flex-col items-start  bg-red-40     text-[#3a3b4a]  pt-">
            <h1 className="text-4xl leading-10 pt-10 ">
              {plant.name} {plant.countInStock}
            </h1>
            <h2 className="text-3xl leading-5 mt-10">${plant.price}</h2>
            <p className="my-10">{plant.description}</p>
            <div className="mx-auto">
              <Specification
                plant={plant}
                n={5}
              />
            </div>
            <div className="mt-12 mb-8 flex space-x-8 items-center justify-center">
              <span>Quantity</span>
              <button
                className="font-bold text-lg w-6 h-6 rounded-full bg-[#e8e6da] flex items-center justify-center hover:bg-[#e8e6da5e] transition-all duration-300 ease-in-out "
                onClick={() => {
                  quantity > 1 && setQuantity(quantity - 1);
                }}
              >
                -
              </button>
              <input
                type={'number'}
                value={quantity}
                className="hidden"
                onChange={(e) => setQuantity(+e.target.value)}
              />
              <span>{`${qtyLoading ? '...' : quantity}`}</span>

              <button
                className="font-bold text-lg w-6 h-6 rounded-full bg-[#e8e6da] flex items-center justify-center hover:bg-[#e8e6da5e] transition-all duration-300 ease-in-out"
                onClick={handleAddQuantity}
              >
                +
              </button>
            </div>
            <div className="mt-12 flex gap-4">
              <span>Status : </span>
              <span
                className={`${
                  plant.countInStock > totalCartQuantity - 1
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}
              >
                {plant.countInStock > totalCartQuantity - 1
                  ? 'In Stock'
                  : 'Out of Stock'}
              </span>
            </div>
            <button
              type="button"
              className="bg-[#b2bc83] transition-all ease-in-out duration-700 hover:bg-gradient-to-r hover:to-blue-500 hover:from-[#b2bc83]   text-slate-100 tracking-wider font-bold text-2xl py-3 mt-3  px-2 w-full self-start text-center"
              onClick={addToCartHandler}
              // disabled={!(plant.countInStock > quantity - 1)}
            >
              Add to Cart
            </button>
          </div>
        </div>
        {/* //a tab to add later */}
        {/* <section className="bg-green-300">
            <div></div>
          </section> */}
      </div>
    </Layout>
  );
};

export default PlantItem;

export async function getServerSideProps(context: any) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const plant = await Plant.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      plant: plant ? db.convertDocToObj(plant) : null,
    },
  };
}
