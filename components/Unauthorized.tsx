import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineStop } from 'react-icons/ai';

export default function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      {/* <AiOutlineStop className="text-5xl  text-red-500 mb-4" /> */}

      <span>You should be signed in to see this page </span>
    </div>
  );
}
