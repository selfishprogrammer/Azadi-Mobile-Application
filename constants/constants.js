import {
  bodyCare,
  cleaning,
  clothsTitle,
  Drinks,
  Education,
  Electronics,
  Fashion,
  Finances,
  Food,
  grocearyTitle,
  law,
  medicineTitle,
  MobilePhones,
} from './images';

const FILTER_LIST = [
  {
    title: 'Cloths',
    category: 'Cloths',
    images: clothsTitle,
  },
  {
    title: 'Grocery',
    category: 'Grocery',
    images: grocearyTitle,
  },
  {
    title: 'Drinks',
    category: 'Drinks',
    images: Drinks,
  },
  {
    title: 'Medicine',
    category: 'Medicine',
    images: medicineTitle,
  },
  {
    title: 'Electronics',
    category: 'Electronics',
    images: Electronics,
  },
  {
    title: 'Fashion',
    category: 'Fashion',
    images: Fashion,
  },
  {
    title: 'Mobile Phones',
    category: 'Mobile Phones',
    images: MobilePhones,
  },
  {
    title: 'Food',
    category: 'Food',
    images: Food,
  },
];

const HOME_CARAOUSEL = [
  'https://i.imgur.com/RPIE6RV.png',
  'https://i.imgur.com/96M8PmF.jpg',
  'https://i.imgur.com/iY0jfVN.jpg',
];
const SERVICES_LIST = [
  {
    title: 'Education',
    category: 'Education',
    images: Education,
  },
  {
    title: 'Electronics',
    category: 'Electronics',
    images: Electronics,
  },
  {
    title: 'Body care',
    category: 'Body care',
    images: bodyCare,
  },
  {
    title: 'Cleaning',
    category: 'Cleaning',
    images: cleaning,
  },
  {
    title: 'Finances',
    category: 'Finances',
    images: Finances,
  },
  {
    title: 'Law',
    category: 'Law',
    images: law,
  },
];

export {FILTER_LIST, HOME_CARAOUSEL, SERVICES_LIST};
