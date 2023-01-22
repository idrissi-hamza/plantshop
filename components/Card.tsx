import Image from 'next/image';
import Specification from './Specification';
import Link from 'next/link';
import { Plant } from '@/utils/data';

const Card = ({ plant }: { plant: Plant }) => {
  return (
    <Link href={`/plants/${plant.slug}`}>
      <div
        className="el-wrapper group 
         shadow-md hover:shadow-lg
        cursor-pointer
          bg-white"
      >
        <div className="box-up flex flex-col">
          <div className="img">
            <Image
              src={plant.image[0]}
              alt="Picture of the plant"
              width={320}
              height={340}
              // objectFit="cover"
            />
          </div>
          <div className="a-more">
            <div className="info-inner  ">
              <div className="inline-block">
                <Specification plant={plant} />
              </div>
            </div>
            More info :{' '}
            <span className="more">more info about the product</span>
          </div>
        </div>

        <div className="h-12 p-name  font-bold flex flex-col items-center justify-center bg-white">
          {plant.name}
        </div>

        <div className="box-down">
          <div className="h-bg">
            <div className="h-bg-inner"></div>
          </div>

          <div
            className="cart"
            
          >
            <span className="price">${plant.price}</span>
            <span className="add-to-cart">
              <span className="txt">Add in cart</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
