import Layout from '@/components/Layout';
import PayRadio from '@/components/PayRadio';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import React, { useEffect, useReducer, useState } from 'react';
import * as Yup from 'yup';
import LoadingButton from '@/components/LoadingButton';
import Cookies from 'js-cookie';
import { useStoreContext } from '@/utils/Store';
import { useRouter } from 'next/router';
import Unauthorized from '@/components/Unauthorized';
import { useSession } from 'next-auth/react';
import Timeline from '@/components/Timeline';
import { TbArrowBackUp } from 'react-icons/tb';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MinForFreeShipping, ShippingFee, Tax } from '@/utils/data';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

const OrderScreen = () => {
  const { data: session, status } = useSession();

  // const { state, dispatch } = useStoreContext();
  // const { cart } = state;
  // const { cartItems, shippingAddress, payMethod } = cart;

  // const router = useRouter();
  const { query } = useRouter();
  const orderId = query.id;

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, orderId]);
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  if (status !== 'authenticated') {
    return (
      <Layout title="Unauthorized Page">
        <Unauthorized />
      </Layout>
    );
  }

  return (
    <Layout title={`Order ${orderId}`}>
      <div className=" flex flex-col  px-14 pt-16  justify-center">
        <h1 className="mb-4 flex gap-2">
          <span className="text-xl font-bold ">Order:</span>
          <span className="font-boldtext-sm  flex items-end">
            {orderId}
          </span>
        </h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="alert-error">{error}</div>
        ) : (
          <div className="md:grid md:grid-cols-4 gap-5 flex flex-col ">
            <div className="overflow-x-auto md:col-span-3 gap-5 flex flex-col">
              <div className="shadow-md border  p-5 ">
                <h2 className="mb-2 text-lg font-bold">Shipping Address</h2>
                <div>
                  {shippingAddress.fullName}, {shippingAddress.address},{' '}
                  {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                  {shippingAddress.country}
                </div>
                {isDelivered ? (
                  <div className="text-green-600 mt-6 ">
                    Delivered at {deliveredAt}
                  </div>
                ) : (
                  <div className="text-red-600 mt-6 text-end">
                    Not delivered yet ...
                  </div>
                )}
              </div>

              <div className="shadow-md border p-5">
                <h2 className="mb-2 text-lg font-bold">Payment Method</h2>
                <div>{paymentMethod}</div>
                {isPaid ? (
                  <div className="text-green-600 mt-4">Paid at {paidAt}</div>
                ) : (
                  <div className="text-red-600 mt-4 text-end">
                    Not paid yet ...
                  </div>
                )}
              </div>

              <div className="shadow-md border overflow-x-auto p-5">
                <h2 className="mb-2 text-lg font-bold">Order Items</h2>
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="px-5 text-left">Item</th>
                      <th className="    p-5 text-right">Quantity</th>
                      <th className="  p-5 text-right">Price</th>
                      <th className="p-5 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map((item) => (
                      <tr
                        key={item._id}
                        className="border-b"
                      >
                        <td>
                          <Link
                            href={`/product/${item.slug}`}
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
              </div>
            </div>

            <div className="shadow-md border  p-5 md:self-start self-center max-w-sm min-w-[24rem] md:min-w-min">
              <h2 className="mb-2 text-lg font-bold">Order Summary</h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Items</div>
                    <div>${itemsPrice}</div>
                  </div>
                </li>{' '}
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
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Total</div>
                    <div>${totalPrice}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}
        {/* <div className=" flex flex-col  px-14 pt-16 flex-1 ">
          <Timeline activeStep={3} />

          <h3 className="block mb-6 bg-clip-text text-transparent bg-gradient-to-r to-blue-500 from-[#b2bc83]  font-bold   text-4xl self-center mt-10">
            Place Order
          </h3>
          <div className="md:grid md:grid-cols-5 gap-5 flex flex-col items-center md:items-start mx-auto "></div>
        </div> */}
      </div>
    </Layout>
  );
};

export default OrderScreen;
