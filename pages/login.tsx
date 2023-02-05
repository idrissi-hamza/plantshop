import Layout from '@/components/Layout';
import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';

import * as Yup from 'yup';
import Link from 'next/link';
import TextInput from '@/components/TextInput';
import LoadingButton from '@/components/LoadingButton';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const Login = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(
        Array.isArray(redirect) ? redirect.join('/') : redirect || '/'
      );
    }
  }, [router, session, redirect]);

  const initialValues = {
    email: '',
    password: '',
  };
  const validationSchema = {
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .required('No password provided.')
      .min(5, 'Password is too short - should be 5 chars minimum.'),
    // .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  };

  const submitHandler = async (
    { email, password }: { email: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      signIn('credentials', {
        redirect: false,
        email,
        password,
      });

    } catch (err: any) {
      let message =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message;
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col w-full sm:w-[30rem] overflow-x-none mx-auto flex-1 place-content-center  mt-10">
        <div className="p-5 sm:px-10 ">
          <h3 className="text-3xl font-bold text-center pb-6">Log in</h3>

          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={submitHandler}
          >
            {({ isSubmitting }) => (
              <Form className="w-full">
                <div className="flex flex-col -space-y-2 pb-10 gap-6">
                  <TextInput
                    label="Email address*"
                    name="email"
                    type="text"
                  />
                  <TextInput
                    label="Password*"
                    name="password"
                    type="password"
                  />
                </div>

                {!isSubmitting ? (
                  <button
                    type="submit"
                    className="text-gray-800   rounded-lg text-base px-4 md:px-5 py-2 md:py-2.5  bg-[#b2bc83] hover:bg-[#a2ab78]  shadow-sm hover:shadow-md active:shadow-none  transition duration-300 ease-in-out font-bold w-full mb-6 "
                  >
                    Log in
                  </button>
                ) : (
                  <LoadingButton />
                )}
              </Form>
            )}
          </Formik>
        </div>

        <div className="border-t relative p-5 sm:px-10  flex flex-col gap-2">
          <span className="text-center mb-3">
            No account yet?
            <Link
              className="font-bold ml-2 text-[#b2bc83]"
              href="#"
            >
              Create one here!
            </Link>
          </span>
        </div>
      </div>
    </Layout>
  );
};
export default Login;
