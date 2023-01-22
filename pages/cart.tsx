import Image from 'next/image';
import Link from 'next/link';
import { useStoreContext } from '../utils/Store';
import Layout from '@/components/Layout';
import { BsTrash } from 'react-icons/bs';
import type { AddedPlant } from '../utils/Store';

const Cart = () => {
  // const router = useRouter();
  const { state, dispatch } = useStoreContext();
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item: AddedPlant) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const updateCartHandler = (item: AddedPlant, qty: number) => {
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity: +qty },
    });
  };
  const addToCartHandler = (item: AddedPlant) => {
    if (item.quantity < item.countInStock) {
      updateCartHandler(item, +item.quantity + 1);
    }
  };
  const removeFromCartHandler = (item: AddedPlant) => {
    if (item.quantity > 1) {
      updateCartHandler(item, +item.quantity - 1);
    } else {
      removeItemHandler(item);
    }
  };
  return (
    <Layout title="Shopping Cart">
      <div className="p-10 min-h-[60vh]">
        <h1 className="mb-4 text-xl">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div>
            Cart is empty. <Link href="/">Go shopping</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 md:gap-5 min-h-full items-start">
            <div className="overflow-x-auto md:col-span-3 md:mx-10 border shadow-md  cursor-pointer">
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
                  {cartItems.map((item) => (
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
                            className="w-6 ppearance-none disabled flex justify-center items-center "
                            disabled
                            onChange={(e) =>
                              updateCartHandler(item, +e.target.value)
                            }
                            max={item.countInStock}
                            min={1}

                            // step={1}
                          />
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
            <div className="shadow-md p-4 hover:scale-105 transition-all duration-500 ease-in-out group cursor-pointer border">
              <div className="flex flex-col">
                <div className="pb-3 text-xl">
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </div>

                <Link
                  href={'/shipping'}
                  className="bg-[#b2bc83] uppercase text-slate-100 tracking-wider font-bold min-w-full  py-3 mt-5 mb-5  w-full self-start text-center "
                >
                  Check Out
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
