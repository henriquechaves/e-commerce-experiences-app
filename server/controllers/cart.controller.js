import Cart from '../models/cart';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

export function getCart(req, res) {
  Cart.findOne({ cuid: req.params.cuid }).exec((err, cart) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ cart });
  });
}

export function getCarts(req, res) {
  Cart.find().sort('-dateAdded').exec((err, carts) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ carts });
  });
}

export function addCart(req, res) {
  if (!req.body.cart || !req.body.token) {
    res.status(403).end();
  }

  const cart = {
    cuid: cuid(),
    token: req.body.token.id,
    email: req.body.token.email,
    funding: req.body.token.card.funding,
    dateAdded: Date.now(),
    dateUpdated: '',
    prods: req.body.cart,
  };

  const newCart = new Cart(cart);

  newCart.save((err, saved) => {
    if (err) {
      res.status(500).send();
    }
    res.json({ cart: saved });
  });
}

export function editCart(req, res) {
  if (
    !req.body.cart.cuid ||
    !req.body.cart.image ||
    !req.body.cart.title ||
    !req.body.cart.price ||
    !req.body.cart.desc ||
    !req.body.cart.content
  ) {
    res.status(403).end();
  }
  Cart.findOne({ cuid: req.body.cart.cuid }).exec((err, cart) => {
    if (err) {
      res.status(500).send(err);
    }
    // Let's sanitize inputs //KLS
    cart.name = sanitizeHtml(req.body.cart.name);
    cart.title = sanitizeHtml(req.body.cart.title);
    cart.description = sanitizeHtml(req.body.cart.description);
    cart.content = sanitizeHtml(req.body.cart.content);
    cart.stock = sanitizeHtml(req.body.cart.stock);
    cart.price = sanitizeHtml(req.body.cart.price);
    cart.slug = slug(req.body.cart.name.toLowerCase(), { lowercase: true });
    cart.peso = sanitizeHtml(req.body.cart.peso);
    cart.volume = sanitizeHtml(req.body.cart.volume);
    cart.image = sanitizeHtml(req.body.cart.image);
    cart.dateUpdated = Date.now();

    cart.save((err, saved) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ cart: saved });
    });
  });
}

export function deleteCart(req, res) {
  Cart.findOne({ cuid: req.params.cuid }).exec((err, cart) => {
    if (err) {
      res.status(500).send(err);
    }

    cart.remove(() => {
      res.status(200).end();
    });
  });
}
