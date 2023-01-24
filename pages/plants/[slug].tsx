import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import data, { Plant } from '../../utils/data';
import Link from 'next/link';
import Image from 'next/image';
import Specification from '../../components/Specification';
import { TbArrowBackUp } from 'react-icons/tb';
import { useStoreContext } from '@/utils/Store';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Plant = () => {
  const { state, dispatch } = useStoreContext();
  const [img, setImg] = useState('');
  const [plant, setPlant] = useState<Plant | null>(null);

  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      const { slug } = router.query;
      // console.log(slug);
      let plant = data.plants.find((plant) => plant.slug === slug);
      // console.log(plant);
      if (plant) {
        setPlant(plant);
        setImg(plant.image[0]);
      }
    }
  }, [router.isReady]);

  const [quantity, setQuantity] = useState(1);

  const handleAddQuantity = () => {
    if (plant) {
      if (quantity < 99 && quantity < plant.countInStock) {
        setQuantity(+quantity + 1);
      } else {
        toast.info('Out of stock!');
        // setQuantity(quantity - 1);
      }
    }
  };
  const addToCartHandler = () => {
    if (plant) {
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === plant.slug
      );
      const newQuantity = existItem ? existItem.quantity + quantity : quantity;

      dispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...plant, quantity: newQuantity },
      });
    }
  };
  return plant ? (
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
            <h1 className="text-4xl leading-10 pt-10 ">{plant.name}</h1>
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
                className="font-bold text-lg"
                onClick={() => {
                  quantity > 1 && setQuantity(quantity - 1);
                }}
              >
                -
              </button>
              <input
                type={'number'}
                value={quantity}
                className="w-10 appearance-none"
                onChange={(e) => setQuantity(+e.target.value)}
                max={plant.countInStock - 1}
                min={1}
              />
              <button
                className="font-bold text-lg"
                onClick={handleAddQuantity}
              >
                +
              </button>
            </div>
            <div className="mt-12 flex gap-4">
              <span>Status : </span>
              <span
                className={`${
                  plant.countInStock > quantity
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}
              >
                {plant.countInStock > quantity ? 'In Stock' : 'Unavailable'}
              </span>
            </div>
            <button
              type="button"
              className="bg-[#b2bc83] uppercase text-slate-100 tracking-wider font-bold min-w-full  py-5 mt-10 mb-10 disabled:bg-gray-300"
              onClick={addToCartHandler}
              disabled={!(plant.countInStock > quantity)}
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
  ) : (
    <div>not found</div>
  );
};

export default Plant;
