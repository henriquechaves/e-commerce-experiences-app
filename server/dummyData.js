import cuid from 'cuid';

import config from './config';
import Product from './models/product';
import api from '../client/util/app';
import {
  clearProductsAlgolia,
  configAlgoliaIndex,
  insertProductsAlgolia
} from '../client/util/algolia';

import conf from './config';

function hydrateMongo() {
  return Product.count().exec((err, count) => {
    if (count > 0) {
      return true;
    }

    let prods = [];
    const date = Date.now();

    for (var k = 1; k <= conf.TOTAL_PRODUCTS_DUMMY_DATA; k++) {
      prods.push(new Product({
          cuid: cuid(),
          name: 'produtct name '+(k),
          title: 'product title '+(k),
          description: `product description ${k}`,
          content: `product content ${k}`,
          stock: Math.floor(Math.random() * 50) + 1,
          price: (Math.floor((Math.random() * 500) + 3) + 0.99).toPrecision(4),
          weight: Math.floor((Math.random() * 5) + 1),
          image_url: 'https://mern-starter-kls-upload-photo-bucket.s3.amazonaws.com/mern-starter-kls-upload-photo-bucket-album/min1.png',
          slug: `product-${k}`,
          dateAdded: date,
          dateUpdated: date,
        }));
    }


    Product.create(prods, (error) => {
      if (!error) {
        true;
      } else {
        console.log("dummy data failed! ", err);
        return false;
      }
    });
  });
}

function hydrateAlgolia() {
  clearProductsAlgolia()
  .then(res => configAlgoliaIndex())
  .then(res => api(config.PRODUCTS_API_URL, 'products'))
  .then(res => insertProductsAlgolia(res.products));
}

export default function setupData() {
  const hydrateDB = new Promise((resolve, reject) => {
    const hydrateMongoOk = hydrateMongo();
    if(hydrateMongoOk) resolve(1);
    else reject(0);
  });
  hydrateDB.then(res => {
    hydrateAlgolia();
  })
  .catch(err => {
    console.log('Setup Data Error: ', err);
  });
}
