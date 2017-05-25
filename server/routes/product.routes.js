import { Router } from 'express';
import * as ProductController from '../controllers/product.controller';
const router = new Router();

// Get all Products
router.route('/products').get(ProductController.getProducts);

// Get one product by cuid
router.route('/products/:cuid').get(ProductController.getProduct);

// Add a new Product
router.route('/products').post(ProductController.addProduct);

// Edit a product by cuid
router.route('/products/edit/:cuid').post(ProductController.editProduct);

// Delete a product by cuid
router.route('/products/:cuid').delete(ProductController.deleteProduct);

export default router;
