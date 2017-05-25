const port = process.env.PORT || 8000;
const local = (typeof window === 'undefined' || process.env.NODE_ENV === 'test');
const baseUrl = process.env.BASE_URL;
const host = 'http://localhost';

export const apiCart = 'apicart';
export const apiProd = 'apiprod';
export const apiCharge = 'apicharge';

const config = {
  CART_API_URL: local ? baseUrl || (`${host}:${port}/${apiCart}`) : `/${apiCart}`,
  PRODUCTS_API_URL: local ? baseUrl || (`${host}:${port}/${apiProd}`) : `/${apiProd}`,
  STRIPE_API_URL: local ? baseUrl || (`${host}:${port}/${apiCharge}`) : `${apiCharge}`,

  ITEMS_PER_PAGE: 6,
  TOTAL_PRODUCTS_DUMMY_DATA: 20,

  port: port,
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/vendedor',

  awsAccessKeyId: '',
  awsSecretAccessKey: '',
  awsBucketName: '',
  awsAlbumName: '',

  ravenKey: '',

  algoliaServerKey: '',
  algoliaAppID: '',
  algoliaIndexName: '',
  algoliaClientKey: '',

  stripePublishableKey: '',
  stripeSecretKey: '',
};

export default config;
