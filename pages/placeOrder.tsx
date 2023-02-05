import Layout from '@/components/Layout';
import PayRadio from '@/components/PayRadio';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import LoadingButton from '@/components/LoadingButton';
import Cookies from 'js-cookie';
import { useStoreContext } from '@/utils/Store';
import { useRouter } from 'next/router';
import Unauthorized from '@/components/Unauthorized';
import { useSession } from 'next-auth/react';
import Timeline from '@/components/Timeline';
import { TbArrowAutofitRight, TbArrowBackUp } from 'react-icons/tb';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MinForFreeShipping, ShippingFee, Tax } from '@/utils/data';

const PlaceOrder = () => {
  const { data: session, status } = useSession();

  const { state, dispatch } = useStoreContext();
  const { cart } = state;
  const { cartItems, shippingAddress, payMethod } = cart;

  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  ); // 123.4567 => 123.46

  const shippingPrice = itemsPrice > MinForFreeShipping ? 0 : ShippingFee;
  const taxPrice = round2(itemsPrice * Tax);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  const router = useRouter();
  useEffect(() => {
    if (!payMethod) {
      router.push('/payment');
    }
  }, [payMethod, router]);

  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      // console.log('placing');
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        payMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });

      setLoading(false);
      dispatch({ type: 'CART_CLEAR_ITEMS' });
      Cookies.set(
        'cart',
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push(`/order/${data._id}`);
    } catch (err: any) {
      setLoading(false);
      let message =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message;
      toast.error(message);
    }
  };
  return (
    <Layout>
      {status === 'authenticated' ? (
        <div className=" flex flex-col  px-14 pt-16 flex-1 ">
          <Timeline activeStep={3} />
          {cartItems.length === 0 ? (
            <div className=" self-center mt-10 flex flex-col gap-8  justify-center items-center">
              <span>Cart is empty.</span>
              <Link
                href="/"
                className=" flex items-center gap-3"
              >
                <TbArrowBackUp className="text-bold text-2xl" />{' '}
                <span>Go Back to Shopping</span>
              </Link>
              <Link
                href="/history"
                className=" flex items-center gap-3"
              >
                <span>See your pending orders</span>
                <TbArrowAutofitRight className="text-bold text-2xl" />{' '}
              </Link>
            </div>
          ) : (
            <>
              <h3 className="block mb-6 bg-clip-text text-transparent bg-gradient-to-r to-blue-500 from-[#b2bc83]  font-bold   text-4xl self-center mt-10">
                Place Order
              </h3>
              <div className="md:grid md:grid-cols-5 gap-5 flex flex-col items-center md:items-start mx-auto ">
                <div className="overflow-x-auto gap-5 flex flex-col md:col-span-3 ">
                  <div className="shadow-md border  p-5">
                    <h2 className="mb-2 text-lg  font-bold">
                      Shipping Address
                    </h2>
                    <div>
                      {shippingAddress.fullName}, {shippingAddress.address},{' '}
                      {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                      {shippingAddress.country}
                    </div>
                    <div className="mt-6 font-bold text-blue-600">
                      <Link href="/shipping">Edit</Link>
                    </div>
                  </div>
                  <div className="shadow-md border  p-5">
                    <h2 className="mb-2 text-lg font-bold">Payment Method</h2>
                    <div>{payMethod}</div>
                    <div className="mt-6 font-bold text-blue-600">
                      <Link href="/payment">Edit</Link>
                    </div>
                  </div>

                  <div className="shadow-md border overflow-x-auto p-5">
                    <h2 className="mb-2 text-lg font-bold">Order Items</h2>
                    <table className="min-w-full">
                      <thead className="border-b bg-[#e8e6da]">
                        <tr>
                          <th className="px-5 text-left">Item</th>
                          <th className="    p-5 text-right">Quantity</th>
                          <th className="  p-5 text-right">Price</th>
                          <th className="p-5 text-right">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item) => (
                          <tr
                            key={item._id}
                            className="border-b"
                          >
                            <td>
                              <Link
                                href={`/plants/${item.slug}`}
                                className="flex items-center gap-2"
                              >
                                <Image
                                  src={item.image[0]}
                                  alt={item.name}
                                  width={50}
                                  height={50}
                                ></Image>

                                <span className="text-sm font-bold">
                                  {item.name}
                                </span>
                              </Link>
                            </td>
                            <td className=" p-5 text-right">{item.quantity}</td>
                            <td className="p-5 text-right">${item.price}</td>
                            <td className="p-5 text-right">
                              ${item.quantity * item.price}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="mt-6 font-bold text-blue-600">
                      <Link href="/cart">Edit</Link>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 max-w-sm min-w-[24rem] md:min-w-min">
                  <div className="shadow-md border  p-4">
                    <h2 className="mb-2 text-lg font-bold">Order Summary</h2>
                    <ul>
                      <li>
                        <div className="mb-2 flex justify-between">
                          <div>Items</div>
                          <div>${itemsPrice}</div>
                        </div>
                      </li>
                      <li>
                        <div className="mb-2 flex justify-between">
                          <div>Tax</div>
                          <div>${taxPrice}</div>
                        </div>
                      </li>
                      <li>
                        <div className="mb-2 flex justify-between">
                          <div>Shipping</div>
                          <div>${shippingPrice}</div>
                        </div>
                      </li>
                      <li className="border-t">
                        <div className="mb-2   flex justify-between font-bold pt-2 text-xl">
                          <div>Total</div>
                          <div>${totalPrice}</div>
                        </div>
                      </li>
                      <li>
                        <button
                          disabled={loading}
                          onClick={placeOrderHandler}
                          className="bg-[#b2bc83] transition-all ease-in-out duration-700 hover:bg-gradient-to-r hover:to-blue-500 hover:from-[#b2bc83]   text-slate-100 tracking-wider font-bold text-2xl py-3 mt-3  px-2 w-full self-start text-center "
                        >
                          {loading ? 'Loading...' : 'Place Order'}
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>{' '}
            </>
          )}
        </div>
      ) : (
        <Unauthorized />
      )}
    </Layout>
  );
};

export default PlaceOrder;
