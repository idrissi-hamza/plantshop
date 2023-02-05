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
import Timeline from '@/components/Timeline';

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
      {session? (
        <div className=" flex flex-col md:px-32 px-14 pt-16">
          <Timeline activeStep={2} />
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

                  <Form className="w-full  max-w-xs mx-auto  relative flex flex-col items-center justify-center  gap-10">
                    <div className=" flex flex-col ">
                      <PayRadio
                        label="Payment Method"
                        name="payMethod"
                        options={options}
                      />
                    </div>

                    <div className=" flex space-x-2 w-full ">
                      <Link
                        className="bg-[#b2bc83] transition-all ease-in-out duration-700 hover:bg-gradient-to-r hover:to-blue-500 hover:from-[#b2bc83]   text-slate-100 tracking-wider font-bold text-2xl py-3   px-2  self-start text-center w-1/2"
                        href="/cart"
                      >
                        Cancel
                      </Link>
                      {!isSubmitting ? (
                        <button
                          type="submit"
                          className="bg-[#b2bc83] transition-all ease-in-out duration-700 hover:bg-gradient-to-r hover:to-blue-500 hover:from-[#b2bc83]   text-slate-100 tracking-wider font-bold text-2xl py-3   px-2  self-start text-center w-1/2"
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
        </div>
      ) : (
        <Unauthorized />
      )}
    </Layout>
  );
};

export default Payement;
