import { Router } from 'express';
import * as stripe from '../charges/stripe';
const router = new Router();

router.route('/products').post(stripe.chargeStripe);

export default router;
