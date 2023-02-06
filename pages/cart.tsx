import Image from 'next/image';
import Link from 'next/link';
import { useStoreContext } from '../utils/Store';
import Layout from '@/components/Layout';
import { BsTrash } from 'react-icons/bs';
import type { AddedPlant } from '../utils/Store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Cart = () => {
  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100;

  const router = useRouter();
  const { state, dispatch } = useStoreContext();
  const {
    cart: { cartItems },
  } = state;

  const [cartItemsC, setcartItemsC] = useState<AddedPlant[]>([]);

  const [qtyLoading, setQtyLoading] = useState(false);
  const [target, setTarget] = useState<AddedPlant | null>(null);

  useEffect(() => {
    setcartItemsC(cartItems);
  }, [cartItems]);

  const removeItemHandler = (item: AddedPlant) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const updateCartHandler = (item: AddedPlant, qty: number) => {
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity: +qty },
    });
    setQtyLoading(false);
  };

  //+ button
  const addToCartHandler = async (item: AddedPlant) => {
    setQtyLoading(true);
    setTarget(item);

    const { data } = await axios.get(`/api/plants/${item._id}`);
    if (item.quantity > data.countInStock - 1) {
      setQtyLoading(false);
      return toast.error('Sorry. Product is out of stock');
    }

    updateCartHandler(item, +item.quantity + 1);
  };

  //- button
  const removeFromCartHandler = (item: AddedPlant) => {
    if (item.quantity > 1) {
      updateCartHandler(item, +item.quantity - 1);
    }
    // else {
    //   removeItemHandler(item);
    // }
  };

  const { data: session } = useSession();
  const handleClick = () => {
    if (session?.user) {
      router.replace('/shipping');
    } else {
      router.push('/login?redirect=/shipping');
    }
  };
  return (
    <Layout title="Shopping Cart">
      <div className="p-10 flex-1">
        <h1 className="mb-4 text-xl">Shopping Cart</h1>
        {cartItemsC.length === 0 ? (
          <div>
            Cart is empty. <Link href="/">Go shopping</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 gap-5  min-h-full items-start flex-wrap">
            <div className="overflow-x-auto md:col-span-3  border shadow-md  cursor-pointer">
              <table className="min-w-full ">
                <thead className="border-b bg-[#e8e6da]">
                  <tr>
                    <th className="p-5 text-left">Items</th>
                    <th className="p-5 ">Quantity</th>
                    <th className="p-5 text-right">Price</th>
                    <th className="p-5">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItemsC.map((item) => (
                    <tr
                      key={item.slug}
                      className="border-b group  transition-all duration-500 ease-in-out"
                    >
                      <td>
                        <Link
                          href={`/plants/${item.slug}`}
                          className="flex items-center gap-3 p-1 "
                        >
                          <Image
                            src={item.image[0]}
                            alt={item.name}
                            width={60}
                            height={60}
                          ></Image>

                          {item.name}
                        </Link>
                      </td>
                      {/* <td className="p-5 text-right">{item.quantity}</td> */}
                      <td className="">
                        <div className="  flex space-x-4 items-center justify-center">
                          <button
                            className="font-bold text-lg w-6 h-6 rounded-full bg-[#e8e6da] flex items-center justify-center hover:bg-[#e8e6da5e] transition-all duration-300 ease-in-out"
                            onClick={() => removeFromCartHandler(item)}
                          >
                            -
                          </button>
                          <input
                            type={'number'}
                            value={item.quantity}
                            className=" hidden  "
                            disabled
                            onChange={(e) =>
                              updateCartHandler(item, +e.target.value)
                            }
                          />
                          <span>
                            {target?._id !== item._id
                              ? `${item.quantity}`
                              : qtyLoading
                              ? '...'
                              : `${item.quantity}`}
                          </span>
                          <button
                            className="font-bold text-lg w-6 h-6 rounded-full bg-[#e8e6da] flex items-center justify-center hover:bg-[#e8e6da5e] transition-all duration-300 ease-in-out"
                            onClick={() => addToCartHandler(item)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="p-5 text-right">${item.price}</td>
                      <td className="p-5 text-center">
                        <button onClick={() => removeItemHandler(item)}>
                          <BsTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="shadow-md p-4 transition-all duration-500 ease-in-out group cursor-pointer border ">
              <div className="flex flex-col">
                <div className="pb-3 text-xl">
                  Subtotal ({cartItemsC.reduce((a, c) => a + c.quantity, 0)}) :
                  ${round2(cartItemsC.reduce((a, c) => a + c.quantity * c.price, 0))}
                </div>
                <button
                  onClick={handleClick}
                  className="bg-[#b2bc83] transition-all ease-in-out duration-700 hover:bg-gradient-to-r hover:to-blue-500 hover:from-[#b2bc83]   text-slate-100 tracking-wider font-bold text-2xl py-3 mt-3  px-2 w-full self-start text-center "
                >
                  Check Out
                </button>
          
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
