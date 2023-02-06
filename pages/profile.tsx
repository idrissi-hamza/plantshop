import Layout from '@/components/Layout';

export default function Profile() {
  return (
    <Layout title="Profile">
      <div className=" mx-auto flex flex-col flex-1 justify-center">
        <h3 className="block mb-6 bg-clip-text  text-blue-500 font-bold   text-4xl  mt-10 text-center">
          we are updating this page ,<br />
          please comeback later
          <br />
          ...{' '}
        </h3>
      </div>
    </Layout>
  );
}
