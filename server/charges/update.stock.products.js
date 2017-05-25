import { updateStockProduct } from '../controllers/product.controller';

export function decreaseStockProducts(products) {
  products.map(p => updateStockProduct(p.cuid,p.amount*(-1)));
}

export function increaseStockProducts(products) {
  products.map(p => updateStockProduct(p.cuid,p.amount));
}
