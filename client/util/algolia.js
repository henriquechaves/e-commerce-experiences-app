import algoliasearch from 'algoliasearch';
import conf from '../../server/config.js';

const client = algoliasearch(conf.algoliaAppID, conf.algoliaServerKey, {protocol: 'https:'});
const index = client.initIndex(conf.algoliaIndexName);

export function configAlgoliaIndex() {
  return index.setSettings({'searchableAttributes': ['title', 'description', 'content', 'cuid']});
}

export function clearProductsAlgolia() {
  return index.clearIndex();
}

function getProductIncrementedByObjectID(p) {
  return Object.assign({objectID: p.cuid}, p);
}

export function insertProductAlgolia(product) {
  if((typeof product === 'undefined') || (typeof product.cuid === 'undefined'))
    return Promise.reject('product.cuid undefined just before insert into algolia');
  return index.addObject(product,product.cuid).then(res => product);
}

// function getProductUserIncrementedByObjectID(pa,pu) {
//   return Object.assign({objectID: pa.hits[0].objectID}, pu);
// }

export function updateProductAlgolia(productUser) {
  // if objectID !== cuid:
  // return index.search(productUser.cuid)
  // .then(productAlgolia => {
  //   let updatedAt = index.saveObject(getProductUserIncrementedByObjectID(productAlgolia, productUser)).then((res) => res.updatedAt);
  //   return updatedAt;
  // })
  // .then(ua => productUser);
  // else:
  return index.saveObject(getProductIncrementedByObjectID(productUser)).then(res => productUser);
}

export function insertProductsAlgolia(arrayProducts) {
  const products = arrayProducts.map(p => {
    return getProductIncrementedByObjectID(p);
  });
  return index.addObjects(products).then(res => arrayProducts);
}

export function deleteProductAlgolia(cuid) {
  return index.deleteObject(cuid).then(res => cuid);
}
