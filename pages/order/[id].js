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
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false, errorPay: action.payload };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false, errorPay: '' };

    default:
      state;
  }
}

const OrderScreen = () => {
  const { data: session, status } = useSession();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const { query } = useRouter();
  const orderId = query.id;

  const [{ loading, error, order, successPay, loadingPay }, dispatch] =
    useReducer(reducer, {
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

    const loadPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/keys/paypal');
      paypalDispatch({
        type: 'resetOptions',
        value: {
          'client-id': clientId,
          currency: 'USD',
        },
      });
      paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
    };

    if (!order._id || successPay || (order._id && order._id !== orderId)) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: 'PAY_RESET' });
      }
    } else {
      loadPaypalScript();
    }
  }, [order, orderId, paypalDispatch, successPay]);
  const {
    shippingAddress,
    payMethod,
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

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY_REQUEST' });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details
        );
        dispatch({ type: 'PAY_SUCCESS', payload: data });
        toast.success('Order is paid successgully');
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: err.message });
        toast.error(err.message);
      }
    });
  }

  function onError(err) {
    toast.error(err.message);
  }

  if (status !== 'authenticated') {
    return (
      <Layout title="Unauthorized Page">
        <Unauthorized />
      </Layout>
    );
  }

  return (
    <Layout title={`Order ${orderId}`}>
      <div className=" flex flex-col  px-14 pt-16  justify-center flex-1  mx-auto max-w-7xl">
        <h1 className="mb-4 flex gap-2">
          <span className="text-xl font-bold ">Order:</span>
          <span className="font-boldtext-sm  flex items-end">{orderId}</span>
        </h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="">{error}</div>
        ) : (
          <div className="2xl:grid 2xl:grid-cols-4 gap-5 flex flex-col ">
            <div className="overflow-x-auto 2xl:col-span-3 gap-5 flex flex-col">
              <div className="flex gap-5">
                <div className="shadow-md border  p-5 w-2/3 ">
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
                    <div className="text-red-600 mt-6 ">
                      Not delivered yet ...
                    </div>
                  )}
                </div>

                <div className="shadow-md border p-5 w-1/3 flex flex-col  ">
                  <h2 className="mb-2 text-lg font-bold">Payment Method</h2>
                  <div>{payMethod}</div>
                  {isPaid ? (
                    <div className="text-green-600 flex-1 flex items-end">
                      Paid at {paidAt}
                    </div>
                  ) : (
                    <div className="text-red-600 flex-1 flex items-end ">
                      Not paid yet ...
                    </div>
                  )}
                </div>
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

            <div className="shadow-md border  p-5 2xl:self-start self-center max-w-sm min-w-[24rem]">
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
                <li className="border-t ">
                  <div className=" flex justify-between font-bold pt-2 text-2xl">
                    <div>Total</div>
                    <div>${totalPrice}</div>
                  </div>
                </li>
                {!isPaid && (
                  <li className="mt-8 -mb-4">
                    {isPending ? (
                      <div>Loading...</div>
                    ) : (
                      <div className="w-full">
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    )}
                    {loadingPay && <div>Loading...</div>}
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrderScreen;
