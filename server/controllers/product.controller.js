import Product from '../models/product';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

export function getProduct(req, res) {
  req.checkParams('cuid', 'cuid must not be empty.').notEmpty();

  const errors = req.validationErrors();

  if(errors) {
    res.status(400).send(errors);
    return;
  }

  Product.findOne({ cuid: req.params.cuid }).exec((err, product) => {
    if (err) {
      res.status(500).send(err);
    }
    console.log(product);
    product.price = parseFloat(product.price).toFixed(2); /* to review */
    res.json({ product });
  });
}

export function getProducts(req, res) {
  Product.find().sort('-dateAdded').exec((err, products) => {
    if (err) {
      res.status(500).send(err);
    }
    products.map(p => {
      p.price = parseFloat(p.price).toFixed(2); /* to review */
      return p;
    });
    res.json({ products });
  });
}

export function addProduct(req, res) {

  req.checkBody('name', 'Name must not be empty.').notEmpty();
  req.checkBody('title', 'Title must not be empty.').notEmpty();
  req.checkBody('description', 'Name must not be empty.').notEmpty();
  req.checkBody('content', 'Content must not be empty.').notEmpty();
  req.checkBody('stock', 'Stock must not be empty.').notEmpty();
  req.checkBody('price', 'Price must not be empty.').notEmpty();
  req.checkBody('weight', 'Weight must not be empty.').notEmpty();

  const errors = req.validationErrors();

  if(errors) {
    res.status(400).send(errors);
    return;
  }

  const product = {
    name: req.body.name,
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    stock: parseInt(req.body.stock),
    price: req.body.price,
    weight: parseInt(req.body.weight),
    image_url: 'https://mern-starter-kls-upload-photo-bucket.s3.amazonaws.com/mern-starter-kls-upload-photo-bucket-album/min1.png',
  }


  const newProduct = new Product(product);

  newProduct.cuid = cuid();

  newProduct.name = sanitizeHtml(newProduct.name);
  newProduct.title = sanitizeHtml(newProduct.title);
  newProduct.description = sanitizeHtml(newProduct.description);
  newProduct.content = sanitizeHtml(newProduct.content);
  newProduct.stock = sanitizeHtml(newProduct.stock);
  newProduct.price = sanitizeHtml(newProduct.price);
  newProduct.weight = sanitizeHtml(newProduct.weight);

  newProduct.slug = slug(newProduct.name.toLowerCase(), { lowercase: true });
  newProduct.dateAdded = Date.now();
  newProduct.dateUpdated = Date.now();

  console.log("o que chegou aqui new? ", newProduct);

  newProduct.save((err, productSaved) => {
    if (err) {
      res.status(500).send();
      console.log("erro? ", err);
    }
    res.json({ product: productSaved });
  });
}

export function editProduct(req, res) {

  req.checkBody('cuid', 'cuid must not be empty.').notEmpty();
  req.checkBody('name', 'Name must not be empty.').notEmpty();
  req.checkBody('title', 'Title must not be empty.').notEmpty();
  req.checkBody('description', 'Name must not be empty.').notEmpty();
  req.checkBody('content', 'Content must not be empty.').notEmpty();
  req.checkBody('stock', 'Stock must not be empty.').notEmpty();
  req.checkBody('price', 'Price must not be empty.').notEmpty();
  req.checkBody('weight', 'Weight must not be empty.').notEmpty();
  req.checkBody('image_url', 'Image must not be empty.').notEmpty();

  const errors = req.validationErrors();

  if(errors) {
    res.status(400).send(errors);
    return;
  }


  Product.findOne({ cuid: req.body.cuid }).exec((err, product) => {
    if (err) {
      res.status(500).send(err);
    }

    // Let's sanitize inputs
    product.name = sanitizeHtml(req.body.name);
    product.title = sanitizeHtml(req.body.title);
    product.description = sanitizeHtml(req.body.description);
    product.content = sanitizeHtml(req.body.content);
    product.stock = sanitizeHtml(req.body.stock);
    product.price = sanitizeHtml(req.body.price);
    product.weight = sanitizeHtml(req.body.weight);
    product.image_url = sanitizeHtml(req.body.image_url);

    product.slug = slug(req.body.name.toLowerCase(), { lowercase: true });
    product.dateUpdated = Date.now();

    product.save((err, productSaved) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ product: productSaved });
    });
  });
}

export function deleteProduct(req, res) {
  req.checkParams('cuid', 'cuid must not be empty.').notEmpty();

  const errors = req.validationErrors();

  if(errors) {
    res.status(400).send(errors);
    return;
  }

  Product.findOne({ cuid: req.params.cuid }).exec((err, product) => {
    if (err) {
      res.status(500).send(err);
    }

    product.remove(() => {
      res.status(200).end();
    });
  });
}

export function updateStockProduct(cuid, diff) {
  if (!cuid || !diff) {
    return false;
  }
  return Product.findOne({ cuid: cuid }).exec((err, product) => {
    if (err) {
      return false;
    }
    product.stock += diff;
    product.dateUpdated = Date.now();
    product.save((err, saved) => {
      if (err) {
        console.log('Error updating stock from ', cuid, err);
        return false;
      }
      return true;
    });
  });
}
