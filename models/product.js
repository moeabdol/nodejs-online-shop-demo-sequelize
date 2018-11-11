const fs   = require('fs');
const path = require('path');

const file = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = (cb) => {
  fs.readFile(file, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

class Product {
  constructor(title, imageURL, description, price) {
    this.title       = title;
    this.imageURL    = imageURL;
    this.description = description;
    this.price       = price;
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(file, JSON.stringify(products), err => {
        if (err) console.error(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
}

module.exports = Product;
