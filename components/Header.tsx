import Link from 'next/link';
import ActiveLink from './ActiveLink';

const Header = () => {
  const navLinks = [
    { id: '1', label: 'Cart', link: '/cart' },
    { id: '2', label: 'Login', link: '/login' },
  ];
  return (
    <header
      className="flex sm:flex-row flex-col justify-between items-center h-auto sm:h-16 px-8 shadow-md w-full bg-[##ebe9eb]
    "
    >
      <style jsx>{`
          .nav-link {
            text-decoration: none;
          }
          .active {
            color: #b2bc83;
            transition: all 0.2s ease-in;
            font-weight : bold;

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
          Eshop
        </Link>
      </div>
      <nav>
        <ul className="flex items-center justify-center sm:flex-row flex-col text-center  my-5 sm:my-0 gap-4">
          {navLinks.map((tab) => (
            <li
              key={tab.id}
              className="transition duration-300 ease-in-out "
            >
              <ActiveLink
                activeClassName="active"
                href={tab.link}
              >
                <a className=" block py-2 pr-4 pl-3  border-b border-gray-100   md:border-0  md:p-0">
                  {tab.label}
                </a>
              </ActiveLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
