import Link from 'next/link';
import ActiveLink from './ActiveLink';

import { useStoreContext } from '@/utils/Store';
import { useState, useEffect, useRef } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { TfiUser, TfiShoppingCartFull } from 'react-icons/tfi';
import Cookies from 'js-cookie';

const Header = () => {
  const { state, dispatch } = useStoreContext();
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(
      cart.cartItems.reduce((cum, cur) => cum + cur.quantity, 0)
    );
  }, [cart.cartItems]);

  const { status, data: session } = useSession();

  //links nav bar
  const navLinks = [
    { id: '1wew', link: '/profile', title: 'Profile' },
    { id: '2ref', link: '/history', title: 'History' },
    // { id: '3csc', link: '', title: 'logout' },
  ];

  const Dropdown = () => {
    const [isHidden, setIsHidden] = useState(true);
    const handleLogout = () => {
      setIsHidden(true);
      Cookies.remove('cart');
      dispatch({ type: 'CART_RESET' });
      signOut({ callbackUrl: '/login' });
    };

    // This will add event listeners for clicks and scrolls on the document, and check if the target is inside the dropdown component using the ref and contains method. If the target is outside the component, it will set the state of the dropdown to be hidden.

    // const dropdownRef = useRef(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClick = (event: any) => {
        if (!dropdownRef?.current?.contains(event.target)) {
          setIsHidden(true);
        }
      };
      document.addEventListener('click', handleClick);
      return () => {
        document.removeEventListener('click', handleClick);
      };
    }, [dropdownRef]);

    useEffect(() => {
      const handleScroll = (event: any) => {
        if (!dropdownRef?.current?.contains(event.target)) {
          setIsHidden(true);
        }
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [dropdownRef]);

    return (
      <div
        className="relative"
        ref={dropdownRef}
      >
        <button
          className={`  rounded-lg  px-2  text-center  font-bold flex items-center justify-center  ${
            !isHidden && 'text-[#a2ab78]'
          }`}
          type="button"
          onClick={() => setIsHidden((prev) => !prev)}
        >
          <TfiUser className="text-xl font-bold" />
        </button>
        {/* <!-- Dropdown menu --> */}
        <div
          className={`z-10 bg-white divide-y divide-gray-300 rounded shadow-md  dark:bg-gray-700 absolute -left-6 ${
            isHidden ? 'hidden' : 'block'
          }`}
        >
          <ul className="py-2  text-gray-700  bg-[#fffdf4]">
            {navLinks.map((link) => (
              <li
                key={link.id}
                className="block px-4 py-2 hover:bg-[rgba(177,188,131,0.4)]  cursor-pointer"
                onClick={() => setIsHidden(true)}
              >
                <Link href={link.link}>{link.title}</Link>
              </li>
            ))}
            <li
              className="block px-4 py-2 hover:bg-[rgba(177,188,131,0.4)] cursor-pointer"
              onClick={handleLogout}
            >
              logout
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <header className="flex sm:flex-row flex-col justify-between items-center h-auto sm:h-16 px-8 shadow-md w-full bg-[#fffdf4]   ">
      <style jsx>{`
        .nav-link {
          text-decoration: none;
        }
        .active {
          color: #a2ab78;
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
        <ul className="flex items-center justify-center sm:flex-row flex-col text-center  my-5 sm:my-0 gap-6">
          <li className="transition duration-300 ease-in-out ">
            <ActiveLink
              activeClassName="active"
              href="/cart"
            >
              <a className=" block py-2 pr-4 pl-3  border-b border-gray-100   md:border-0  md:p-0 relative ">
                <TfiShoppingCartFull className="text-3xl" />
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-full bg-red-500  text-xs text-white font-bold absolute aspect-square w-4 left-3 -top-1 flex items-center justify-center animate-bounce">
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
              // session.user.name
              <Dropdown />
            ) : (
              <ActiveLink
                activeClassName="activen "
                href="/login"
              >
                <a className=" bg-[#b2bc83] hover:bg-[#a2ab78] rounded-md  block py-2 pr-4 pl-3  border-b border-gray-100   md:border-0  ">
                  login
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
