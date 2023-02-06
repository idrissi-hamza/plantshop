import Image from 'next/image';
import Specification from './Specification';
import Link from 'next/link';
import type { PlantType } from '@/utils/data';

const Card = ({
  plant,
  addToCartHandler,
}: {
  plant: PlantType;
  addToCartHandler: any;
}) => {
  return (
    // <div href={`/plants/${plant.slug}`}>
    <div
      className="el-wrapper group 
         shadow-md hover:shadow-lg
        cursor-pointer
          bg-white"
    >
      <Link
        href={`/plants/${plant.slug}`}
        className="box-up flex flex-col"
      >
        <div className="img w-[320px] relative h-[340px]">
          <Image
            src={plant.image[0]}
            alt="Picture of the plant"
            // width={320}
            // height={340}
            // objectFit="cover"
            fill
          />
        </div>
        <div className="a-more">
          <div className="info-inner  ">
            <div className="inline-block">
              <Specification plant={plant} />
            </div>
          </div>
          <div className='px-6'>
            More info :{' '}
            <span className="more ">{plant.description.slice(0, 40)}...</span>
          </div>
        </div>
      </Link>

      <div className="h-12 p-name  font-bold flex flex-col items-center justify-center bg-white">
        {plant.name}
      </div>

      <div className="box-down">
        <div className="h-bg">
          <div className="h-bg-inner"></div>
        </div>

        <button
          className="cart"
          type="button"
          onClick={() => addToCartHandler(plant)}
        >
          <span className="price">${plant.price}</span>
          <span className="add-to-cart ">
            <span className="txt ">Add in cart</span>
          </span>
        </button>
      </div>
    </div>
    // </div>
  );
};

export default Card;
