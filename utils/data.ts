import bcrypt from 'bcryptjs';

export const MinForFreeShipping = 200;
export const ShippingFee = 200;

export const Tax = 0.2;

export type PlantType = {
  _id?: string;
  name: string;
  slug: string;
  family: string;
  image: string[];
  price: number;
  rating: number;
  countInStock: number;
  description: string;
  specifications: string[];
};
const data = {
  users: [
    {
      name: 'hamzaAdmin',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'hamzaUser',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  plants: [
    {
      name: 'Moonlight',
      slug: 'moonlight',
      family: 'Philodendron',
      image: [
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl.s.b.021-thumbnail.jpg&w=640&q=100',
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl.s.b.021-2.jpg&w=640&q=100',
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2F0%2F1%2F01-verpakking_-_baby_plugje_1.jpg&w=640&q=100',
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl.s.b.021-thumbnail.jpg&w=640&q=100',
      ],
      price: 4.85,
      rating: 4,
      numReviews: 6,
      countInStock: 4,
      description:
        'With her dramatic range of neon greens and yellows, the baby Philodendron Moonlight knows how to make an entrance. Her spear-shaped leaves seem to radiate light, which is perhaps why she earned her name! Like almost every Philodendron, she is easy to care for and will grows into a fully-fledged livingroom plant in no time.',
      specifications: ['4cm', '±20cm', 'partly shady', 'easy', 'air cleaner'],
    },
    {
      name: 'Bloodleaf',
      slug: 'bloodleaf',
      family: 'Iresine',
      image: [
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl.s.m.050-thumbnail.jpg&w=640&q=100',
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl.s.m.050-2.jpg&w=640&q=100',
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl.s.m.050-thumbnail.jpg&w=640&q=100',
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fh%2Fe%2Fherbstii_irensine_-_plantengekkie1984_1.png&w=640&q=100',
      ],
      price: 4.45,
      rating: 4.7,
      numReviews: 6,
      countInStock: 16,
      description:
        'This baby is called Bloodleaf or Beefsteak plant and is known for her stunning ornamental foliage. She provides a spectacular show of foliage colour throughout the season. Her leaf colour varies from a dark purple to beet red with magenta veins. Native to South America, this plant is relatively uncommon, but it will certainly not look out of place in your home!',
      specifications: ['6cm', '±10cm', 'partly shady', 'easy', 'air cleaner'],
    },
    {
      name: 'Monkey Mask',
      slug: 'monkey-mask',
      family: 'Monstera Adansonii',
      image: [
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl.s.b.006-thumbnail2.jpg&w=640&q=100',
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl.s.b.006-2.jpg&w=640&q=100',
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl.s.b.006-8.jpg&w=640&q=100',
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fa%2Fd%2Fadasonii_-_hydroplantie_1.jpg&w=640&q=100',
      ],
      price: 5.45,
      rating: 4,
      numReviews: 5,
      countInStock: 0,
      description:
        'The baby Monstera Adansonii, sometimes known as a Swiss cheese plant or a monkey mask, is a natural climber. If you give her a bit of space in your living room you will quickly see roots emerging to try to find things to grab hold of. Offer them a wire or a post to hold on to and in no time your Monstera will be on its way upwards, and will show how happy she is by sprouting big new leaves.',
      specifications: ['2cm', '±15cm', 'partly shady', 'easy', 'air cleaner'],
    },
    {
      name: 'Baby Williams',
      slug: 'baby-williams',
      family: 'Alocasia',
      image: [
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl.s.b.097-1-2.jpg&w=640&q=100',
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl.s.b.097-2.jpg&w=640&q=100',
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl.s.b.097-3.jpg&w=640&q=100',
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl.s.b.097-vierkant-2.jpg&w=640&q=100',
      ],
      price: 8.95,
      rating: 4.3,
      numReviews: 2,
      countInStock: 15,
      description:
        'The baby Alocasia William Hybrid is really beautiful! When mature, she has large green leaves with white veins and dark maroon undersides. The edges of the leaves are wavy and the stems are dark green. So she will definitely exude something unique. This Alocasia is also known as Mayan Mask. Like other Alocasia, it can grow quite large if cared for properly. Are you up to the challenge?',
      specifications: ['3cm', '±8cm', 'partly shady', 'easy', 'air cleaner'],
    },
    {
      name: 'Blonde',
      slug: 'blonde',
      family: 'Nephrolepis',
      image: [
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl_s_b_018-thumbnail_2.jpg&w=640&q=100',
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fn%2Fe%2Fnephrolepis_blonde_-_lilon_1.png&w=640&q=100',
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl.s.b.018-8.jpg&w=640&q=100',

        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fn%2Fe%2Fnephrolepis_blonde_-_magdalena_szafranska_ms_1.png&w=640&q=100',
      ],
      price: 25,
      rating: 4.3,
      numReviews: 2,
      countInStock: 10,
      description:
        'The Velvet Baby Plant Set is the perfect choice for Aroid enthusiasts who can’t help but fall for soft, velvety foliage that looks as luxurious as it feels!',
      specifications: ['4cm', '±25cm', 'partly shady', 'easy', 'air cleaner'],
    },
    {
      name: 'Thai Constellation',
      slug: 'thai-constellation',
      family: 'Monstera',
      image: [
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl.s.m.068-thumbnail.jpg&w=640&q=100',
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl.s.m.068-2.jpg&w=640&q=100',
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl.s.m.068-3.jpg&w=640&q=100',
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl.s.m.068-4.jpg&w=640&q=100',
      ],
      price: 23.95,
      rating: 4.8,
      numReviews: 10,
      countInStock: 20,
      description:
        'Here is the most beloved and rare Thai Constellation. To make her even more desirable, this is the cute baby form! She earns her name on her variegation that looks like a constellation. In contrast to most variegated plants, the Thai’s variegation is stable, yay! This is because she was especially produced for this, which also means that you will not be able to find this cutie anywhere in nature. All with all, a very special plant that would love a spot inside your urban jungle!',
      specifications: ['6cm', '±15cm', 'partly shady', 'easy', 'air cleaner'],
    },
    {
      name: 'Mamei Silver Cloud',
      slug: 'mamei-silver-cloud',
      family: 'Philodendron',
      image: [
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl.s.b.092-thumbnail.jpg&w=640&q=100',
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl.s.b.092-2.jpg&w=640&q=100',
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl.s.b.092-3.jpg&w=640&q=100',
      ],
      price: 5.95,
      rating: 4.8,
      numReviews: 10,
      countInStock: 5,
      description:
        'Here is the most beloved and rare Thai Constellation. To make her even more desirable, this is the cute baby form! She earns her name on her variegation that looks like a constellation. In contrast to most variegated plants, the Thai’s variegation is stable, yay! This is because she was especially produced for this, which also means that you will not be able to find this cutie anywhere in nature. All with all, a very special plant that would love a spot inside your urban jungle!',
      specifications: ['3cm', '±8cm', 'partly shady', 'easy', 'air cleaner'],
    },
    {
      name: 'Mojito',
      slug: 'mojito',
      family: 'Pilea Peperomioides',
      image: [
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl_s_b_029-thumbnail_3.jpg&w=640&q=100',
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl_s_b_029-2.jpg&w=640&q=100',
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl.s.b.029-8.jpg&w=640&q=100',
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl_s_b_029-thumbnail_3.jpg&w=640&q=100',
      ],
      price: 4.45,
      rating: 4.2,
      numReviews: 13,
      countInStock: 15,
      description:
        'The baby Pilea Peperomioides Mojito is a cultivar of Pilea, also called the Chinese penny plant or pancake plant. The Mojito is distinguished from the rest of this popular family by her beautiful light-to-dark leaf pattern, reminiscent of a cool mojito on a tropical island. Originally from China, this little cutie has conquered the hearts of many plant parents. In addition to its air-purifying qualities, this lady is a grateful roommate. This rare little plant multiplies quickly, so before you know it your family will be expanding!',
      specifications: ['2cm', '±15cm', 'partly shady', 'easy', 'air cleaner'],
    },
    {
      name: 'Amagris',
      slug: 'amagris',
      family: 'Ctenanthe',
      image: [
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl.s.m.018-thumbnail.jpg&w=640&q=100',
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl.s.m.018-2.jpg&w=640&q=100',
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl.s.m.014-8.jpg&w=640&q=100',
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl.s.m.018-thumbnail.jpg&w=640&q=100',
      ],
      price: 6.45,
      rating: 4.4,
      numReviews: 3,
      countInStock: 5,
      description:
        'People fall hard for the baby Philodendron Scandens, and it’s easy to see why. She has beautiful heart-shaped leaves that all have a lovely deep green colour. The Philodendron Scandens is a very easy plant that, with the right care, will quickly grow into an impressive hanging or climbing plant. Philodendron Scandens originates from the jungles of South America, where she climbs sky high along trees.',
      specifications: ['6cm', '±15cm', 'partly shady', 'easy', 'air cleaner'],
    },
    {
      name: 'Scandens',
      slug: 'scandens',
      family: 'Philodendron',
      image: [
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl_s_m_003-thumbnail.jpg&w=640&q=100',
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl_s_m_003-2.jpg&w=640&q=100',
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl.s.m.003-8.jpg&w=640&q=100',
        'https://plnts.com/_next/image?url=https%3A%2F%2Fwebshop.plnts.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Faa5d334f459227518b6c3cf7ea9d29ed%2Fp%2Fl%2Fpl_s_m_003-thumbnail.jpg&w=640&q=100',
      ],
      price: 4.45,
      rating: 4.2,
      numReviews: 13,
      countInStock: 15,
      description:
        'People fall hard for the baby Philodendron Scandens, and it’s easy to see why. She has beautiful heart-shaped leaves that all have a lovely deep green colour. The Philodendron Scandens is a very easy plant that, with the right care, will quickly grow into an impressive hanging or climbing plant. Philodendron Scandens originates from the jungles of South America, where she climbs sky high along trees.',
      specifications: ['6cm', '±15cm', 'partly shady', 'easy', 'air cleaner'],
    },
  
  ],
};
export default data;
