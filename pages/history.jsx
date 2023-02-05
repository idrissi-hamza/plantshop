import Layout from '@/components/Layout';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import Unauthorized from '@/components/Unauthorized';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'react-toastify';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
function OrderHistoryScreen() {
  const { data: session, status } = useSession();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/history`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchOrders();
  }, []);

  if (status !== 'authenticated') {
    return (
      <Layout title="Unauthorized Page">
        <Unauthorized />
      </Layout>
    );
  }

  return (
    <Layout title={`Order history`}>
      <div className=" flex flex-col  px-14 pt-16  justify-center flex-1  mx-auto max-w-7xl">
      <h1 className="block mb-10 bg-clip-text text-transparent bg-gradient-to-r to-blue-500 from-[#b2bc83]  font-bold   text-4xl self-center mt-4">Order History</h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead className=" border-b bg-[#e8e6da]">
                <tr>
                  <th className="px-5 text-left">ID</th>
                  <th className="p-5 text-left">DATE</th>
                  <th className="p-5 text-left">TOTAL</th>
                  <th className="p-5 text-left">PAID</th>
                  <th className="p-5 text-left">DELIVERED</th>
                  <th className="p-5 text-left">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b"
                  >
                    <td className=" p-5 ">{order._id.substring(20, 24)}</td>
                    <td className=" p-5 ">
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td className=" p-5 ">${order.totalPrice}</td>
                    <td className=" p-5 ">
                      {order.isPaid
                        ? `${order.paidAt.substring(0, 10)}`
                        : 'not paid'}
                    </td>
                    <td className=" p-5 ">
                      {order.isDelivered
                        ? `${order.deliveredAt.substring(0, 10)}`
                        : 'not delivered'}
                    </td>
                    <td className=" p-5 text-blue-600 font-semibold underline">
                      <Link href={`/order/${order._id}`}>Details</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default OrderHistoryScreen;
