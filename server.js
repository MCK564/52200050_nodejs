const express = require('express');
const hbs = require('hbs');
const path = require('path');
const { table, forLoop } = require('./helpers');

const app = express();


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


hbs.registerHelper('table', table);
hbs.registerHelper('for', forLoop);


const product = {
  name: "iPhone 14 promax",
  price: 1190,
  desc: "Nội dung mô tả dài",
  images: ["img1.png", "img2.png", "img3.png"],
  vars: [
    { name: "iPhone 14 promax 128GB", price: 790 },
    { name: "iPhone 14 promax 256GB", price: 990 }
  ]
};


app.get('/details', (req, res) => {
  res.render('details', { product });
});


app.get('/table', (req, res) => {
  res.render('table', { rows: 3, cols: 5 });
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});