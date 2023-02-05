import Layout from '@/components/Layout';
import TextInput from '@/components/TextInput';
import Timeline from '@/components/Timeline';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { ShippingAdressType, useStoreContext } from '@/utils/Store';
import LoadingButton from '@/components/LoadingButton';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useSession } from 'next-auth/react';
import Login from './login';
import Unauthorized from '@/components/Unauthorized';

const Shipping = () => {
  const { state, dispatch } = useStoreContext();
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  const { data: session } = useSession();

  const [initialValues, setInitialValues] = useState({
    fullName: shippingAddress?.fullName || '',
    address: shippingAddress?.address || '',
    city: shippingAddress?.city || '',
    postalCode: shippingAddress?.postalCode || '',
    country: shippingAddress?.country || "",
  });

  useEffect(() => {
    setInitialValues({
      fullName: shippingAddress?.fullName,
      address: shippingAddress?.address,
      city: shippingAddress?.city,
      postalCode: shippingAddress?.postalCode,
      country: shippingAddress?.country,
    });
  }, [shippingAddress?.address, shippingAddress?.city, shippingAddress?.country, shippingAddress?.fullName, shippingAddress?.postalCode]);
  const validationSchema = {
    fullName: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    city: Yup.string(),
    postalCode: Yup.string(),
    country: Yup.string(),
  };

  const submitHandler = (
    { fullName, address, city, postalCode, country }: ShippingAdressType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
        },
      })
    );
    router.push('/payment');
    setSubmitting(false);
  };

  return (
    <Layout>
      {session ? (
        <div className=" flex flex-col md:px-32 px-14 pt-16">
          <Timeline activeStep={1} />
          <div className="flex flex-col w-full sm:w-[30rem] overflow-x-none mx-auto">
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object(validationSchema)}
              onSubmit={submitHandler}
            >
              {({ isSubmitting }) => (
                <Form className="w-full">
                  <div className="flex flex-col -space-y-2 pb-10 gap-6">
                    {[
                      { fullName: 'Full Name*' },
                      { address: 'Address*' },
                      { city: 'City' },
                      { postalCode: 'Postal Code' },
                      { country: 'Country' },
                    ]
                      .flatMap((object) => Object.entries(object))
                      .map(([key, val], i) => (
                        <TextInput
                          key={i}
                          label={val}
                          name={key}
                          type="text"
                        />
                      ))}
                  </div>

                  {!isSubmitting ? (
                    <button
                      type="submit"
                      className="bg-[#b2bc83] transition-all ease-in-out duration-700 hover:bg-gradient-to-r hover:to-blue-500 hover:from-[#b2bc83]   text-slate-100 tracking-wider font-bold text-2xl py-3 mt-3  px-2 w-full self-start text-center "
                    >
                      Go to Payment
                    </button>
                  ) : (
                    <LoadingButton />
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      ) : (
        <Unauthorized />
      )}
    </Layout>
  );
};

export default Shipping;
