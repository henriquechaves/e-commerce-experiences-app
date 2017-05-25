import conf from '../config';
import { decreaseStockProducts } from './update.stock.products';

const keySecret = process.env.SECRET_KEY || conf.stripeSecretKey;
const stripe = require("stripe")(keySecret);

export function chargeStripe(req, res) {
  if (!req.body.cart) {
    res.status(403).end();
  }

  let soma = 0;
  req.body.cart.prods.map(p => {
    soma += p.price*p.amount;
  });
  const total = parseInt(parseFloat(soma)*100);

  const cart = {
    cuid: req.body.cart.cuid,
    token: req.body.cart.token,
    email: req.body.cart.email,
    funding: req.body.cart.funding,
    total: total,
  };

  stripe.charges.create({
    amount: cart.total,
    currency: "usd",
    description: "KLS1 Charge",
    source: cart.token,
    metadata: { order_id: cart.cuid },
  }).then(charge => {
    if(charge.paid) {
      decreaseStockProducts(req.body.cart.prods);
      res.json({ res: true });
    } else {
      res.json({ res: false });
    }
  });
}
