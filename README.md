# e-commerce-experiences-app

e-commerce-app is a purchase app.

There is images for products, search by products.

The products can be edited.

## Instant Search by Algolia

The app read data from local no-sql data base (JSON format) and provide data to a "index" in Algolia. Then, the magic is made.

## S3 image host

We use AWS service to host the product's image file for us.

## Payment Gateway by Stripe

The payment is manage by Stripe. You can add products to the cart and test the payment button.

## Sentry

App make use of Raven middleware to manage errors.

## Edit Product

Administrators can edit the products.
All modifications are propagated to externals in the same time.

## Pagination
