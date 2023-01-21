import React from 'react';
import svgs from '../utils/svgs';
import { Plant } from '@/utils/data';

const Specification = ({ plant, n = 3 }: { plant: Plant; n?: number }) => {
  return (
    <ul className="flex  text-black space-x-6">
      {svgs.slice(0, n).map((el, i) => (
        <li
          key={i}
          className=" flex flex-col justify-center items-center "
        >
          <span className="w-10">{el.svg}</span>
          <span className="font-bold text-sm">{el.specification}</span>
          <span className="text-sm no">{plant.specifications[i]}</span>
        </li>
      ))}
    </ul>
  );
};

export default Specification;
