import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

const Layout = ({
  title,
  keywords,
  description,
  children,
}: {
  title: string;
  keywords: string;
  description: string;
  children: JSX.Element;
}) => {
  return (
    <div className="min-h-screen flex flex-col max-w-8xl mx-auto ">
      <Head>
        <title>{title ? `${title} - Green Shop ` : 'Green Shop'}</title>
        <meta
          name="description"
          content={description}
        />
        <meta
          name="keywords"
          content={keywords}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </Head>
      <Header />
      {children}
      <Footer />
    </div>
  );
};
Layout.defaultProps = {
  title: 'Green Shop | Find your plant',
  description: 'Find your product',
  keywords: 'product1,product2',
  // TODO to custom later
};

export default Layout;
