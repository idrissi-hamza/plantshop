import Link from 'next/link';

const Header = () => {
  const navLinks = [
    { label: 'Login', link: '/login' },
    { label: 'logout', link: '/nav2' },
    { label: 'signup', link: '/signup' },
  ];
  return (
    <header
      className="flex sm:flex-row flex-col justify-between items-center h-auto sm:h-16 px-8 shadow-md w-full bg-[##ebe9eb]
    "
    >
      {/* bg-[#b2bc83 ] */}
      <div className="my-5 sm:my-0 ">
        <Link
          href="/"
          className="sm:mr-5  primary-clr   font-extrabold text-xl  "
        >
          Eshop
        </Link>
      </div>
      <nav>
        <ul className="flex items-center justify-center sm:flex-row flex-col text-center  my-5 sm:my-0">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.link}
                className="sm:mr-5 text-slate-700 hover:text-black"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
