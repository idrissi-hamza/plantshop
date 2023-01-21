export type Plant = {
  name: string;
  slug: string;
  family: string;
  image: string[];
  price: string;
  characteristic: string;
  rating: number;
  countInStock: number;
  description: string;
  specifications: string[];
};
const data = {
  plants: [
    {
      name: 'Velvet Baby Plant Set',
      slug: 'velvet-baby-set',
      family: 'Baby Plants',
      image: [
        '/images/velvet.jpg',
        '/images/euly.jpeg',
        '/images/velvet.jpg',
        '/images/euly.jpeg',
        '/images/velvet.jpg',
        '/images/euly.jpeg',
      ],
      price: '25$',
      characteristic: '',
      rating: 4,
      countInStock: 10,
      description:
        'The Velvet Baby Plant Set is the perfect choice for Aroid enthusiasts who can’t help but fall for soft, velvety foliage that looks as luxurious as it feels!',
      specifications: ['4cm', '±25cm', 'partly shady', 'easy', 'air cleaner'],
    },
    {
      name: 'Eulychnia Castanea f. Varispiralis',
      slug: 'eulchina-castanea',
      family: 'Baby Plants',
      image: [
        '/images/euly.jpeg',
        '/images/velvet.jpg',
        '/images/velvet.jpg',
        '/images/euly.jpeg',
        '/images/velvet.jpg',
        '/images/euly.jpeg',
      ],
      price: '25$',
      // placement:"",
      rating: 4.5,
      countInStock: 9,
      description:
        'Eulychnia Castanea f. Varispiralis has a columnar stem that consist of tubercles which grow in a characteristic, whirly spiral way. It grows long brown spines between the separate tubercles. it is a super fun cactus which has a handsome, architectural appeal!',
      specifications: ['4cm', '±25cm', 'partly shady', 'easy', 'air cleaner'],
    },
    {
      name: 'Velvet 2',
      slug: 'velvet-2',
      family: 'Baby Plants',
      image: [
        '/images/pink.jpg',
        '/images/euly.jpeg',
        '/images/velvet.jpg',
        '/images/euly.jpeg',
        '/images/velvet.jpg',
        '/images/euly.jpeg',
      ],
      price: '25$',
      characteristic: '',
      rating: 4,
      countInStock: 0,
      description:
        'The Velvet Baby Plant Set is the perfect choice for Aroid enthusiasts who can’t help but fall for soft, velvety foliage that looks as luxurious as it feels!',
      specifications: ['4cm', '±25cm', 'partly shady', 'easy', 'air cleaner'],
    },
    {
      name: 'Velvet 3',
      slug: 'velvet-3',
      family: 'Baby Plants',
      image: [
        '/images/velvet.jpg',
        '/images/euly.jpeg',
        '/images/pink.jpg',
        '/images/euly.jpeg',
        '/images/velvet.jpg',
        '/images/euly.jpeg',
      ],
      price: '25$',
      characteristic: '',
      rating: 4,
      countInStock: 10,
      description:
        'The Velvet Baby Plant Set is the perfect choice for Aroid enthusiasts who can’t help but fall for soft, velvety foliage that looks as luxurious as it feels!',
      specifications: ['4cm', '±25cm', 'partly shady', 'easy', 'air cleaner'],
    },
  ],
};
export default data;
