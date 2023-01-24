import Link from 'next/link';
import ActiveLink from './ActiveLink';

import { useStoreContext } from '@/utils/Store';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const Header = () => {
  const { state } = useStoreContext();
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(
      cart.cartItems.reduce((cum, cur) => cum + cur.quantity, 0)
    );
  }, [cart.cartItems]);

  const { status, data: session } = useSession();
  
  return (
    <header className="flex sm:flex-row flex-col justify-between items-center h-auto sm:h-16 px-8 shadow-md w-full bg-[#fffdf4]   ">
      <style jsx>{`
        .nav-link {
          text-decoration: none;
        }
        .active {
          color: #b2bc83;
          transition: all 0.2s ease-in;
          font-weight: bold;
        }
        .nav-link:hover {
          color: black;
        }
      `}</style>

      <div className="my-5 sm:my-0 ">
        <Link
          href="/"
          className="sm:mr-5  primary-clr   font-extrabold text-xl  "
        >
          Green Shop
        </Link>
      </div>
      <nav>
        <ul className="flex items-center justify-center sm:flex-row flex-col text-center  my-5 sm:my-0 gap-4">
          <li className="transition duration-300 ease-in-out ">
            <ActiveLink
              activeClassName="active"
              href="/cart"
            >
              <a className=" block py-2 pr-4 pl-3  border-b border-gray-100   md:border-0  md:p-0 relative">
                Cart
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-full bg-red-500  text-xs text-white font-bold absolute aspect-square w-5 left-5 -top-2 flex items-center justify-center animate-bounce">
                    {cartItemsCount}
                  </span>
                )}
              </a>
            </ActiveLink>
          </li>
          <li className="transition duration-300 ease-in-out ">
            {status === 'loading' ? (
              'loading'
            ) : session?.user ? (
              session.user.name
            ) : (
              <ActiveLink
                activeClassName="active"
                href="/login"
              >
                <a className=" block py-2 pr-4 pl-3  border-b border-gray-100   md:border-0  md:p-0">
                  Login
                </a>
              </ActiveLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
