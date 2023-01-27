import Layout from '@/components/Layout';
import PayRadio from '@/components/PayRadio';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import LoadingButton from '@/components/LoadingButton';
import Cookies from 'js-cookie';
import { useStoreContext } from '@/utils/Store';
import { useRouter } from 'next/router';
import Unauthorized from '@/components/Unauthorized';
import { useSession } from 'next-auth/react';

const Payement = () => {
  const { data: session } = useSession();

  const options = [
    { label: 'PayPal', value: 'paypal' },
    { label: 'Credit / Debit Card', value: 'stripe' },
    {
      label: 'Buy Now, Pay Later',
      value: 'cashOnDelivery',
    },
  ];

  const router = useRouter();
  const { state, dispatch } = useStoreContext();
  const { cart } = state;
  const { shippingAddress, payMethod } = cart;
  const submitHandler = (
    { payMethod }: { payMethod: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: payMethod });

    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        payMethod,
      })
    );
    router.push('/placeOrder');
    setSubmitting(false);
  };

  const [initialValues, setInitialValues] = useState(payMethod);

  useEffect(() => {
    async function handleEffect() {
      if (shippingAddress.address === '') {
        await router.push('/shipping');
      } else {
        setInitialValues(payMethod || '');
      }
    }
    handleEffect();
  }, [payMethod, router, shippingAddress.address]);

  return (
    <Layout>
      {session ? (
        <div className="flex-1  flex items-center ">
          <Formik
            initialValues={{ payMethod: initialValues }}
            validationSchema={Yup.object({
              payMethod: Yup.string(),
            })}
            onSubmit={submitHandler}
          >
            {({ values, isSubmitting }) => (
              <>
                {/* <span>{values.level}</span> */}
                <Form className="w-full pr-10  relative flex flex-col items-center justify-center  gap-10">
                  <div className=" flex flex-col ">
                    <PayRadio
                      label="Payment Method"
                      name="payMethod"
                      options={options}
                    />
                  </div>

                  <div className=" flex space-x-6 w-ful ">
                    <Link
                      className="text-gray-800   rounded-lg text-base px-4 md:px-5 py-2 md:py-2.5  bg-[#b2bc83] hover:bg-[#a2ab78]  shadow-sm hover:shadow-md active:shadow-none  transition duration-300 ease-in-out font-bold  mb-6 flex items-center justify-center w-32"
                      href="/cart"
                    >
                      Cancel
                    </Link>
                    {!isSubmitting ? (
                      <button
                        type="submit"
                        className="text-gray-800   rounded-lg text-base px-4 md:px-5 py-2 md:py-2.5  bg-[#b2bc83] hover:bg-[#a2ab78]  shadow-sm hover:shadow-md active:shadow-none  transition duration-300 ease-in-out font-bold w-32 mb-6 "
                      >
                        Continue
                      </button>
                    ) : (
                      <LoadingButton />
                    )}
                  </div>
                </Form>
              </>
            )}
          </Formik>
        </div>
      ) : (
        <Unauthorized />
      )}
    </Layout>
  );
};

export default Payement;
