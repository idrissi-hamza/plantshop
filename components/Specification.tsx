import React from 'react';
import svgs from '../utils/svgs';
import { PlantType } from '@/utils/data';

const Specification = ({ plant, n = 3 }: { plant: PlantType; n?: number }) => {
  return (
    <ul className="flex  text-black space-x-6">
      {svgs.slice(0, n).map((el, i) => (
        <li
          key={i}
          className=" flex flex-col justify-center items-center "
        >
          <span className="w-10">{el.svg}</span>
          <span className=" text-sm font-semibold">{el.specification}</span>
          <span className="text-sm font-bold">{plant.specifications[i]}</span>
        </li>
      ))}
    </ul>
  );
};

export default Specification;
