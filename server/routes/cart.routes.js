import { Router } from 'express';
import * as CartController from '../controllers/cart.controller';
const router = new Router();

// // Get all Products
router.route('/carts').get(CartController.getCarts);

// // Get one product by cuid
router.route('/carts/:cuid').get(CartController.getCart);
//
// // Add a new Cart
router.route('/carts').post(CartController.addCart);
//
// // Edit a product by cuid
router.route('/edit/:cuid').post(CartController.editCart);
//
// // Delete a product by cuid
router.route('/carts/:cuid').delete(CartController.deleteCart);
//
export default router;
