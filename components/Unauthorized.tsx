import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineStop } from 'react-icons/ai';

export default function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      {/* <AiOutlineStop className="text-5xl  text-red-500 mb-4" /> */}
      <h1 className="text-5xl  text-red-500 mb-4 flex gap-3">
        <AiOutlineStop className="animate-spin" /> Access Denied{' '}
        <AiOutlineStop className="animate-spin" />
      </h1>
      {message && <div className="mb-4 text-2xl">{message}</div>}
    </div>
  );
}
