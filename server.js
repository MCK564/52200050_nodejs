const express = require('express')
const app = express();
const session = require('express-session')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

app.use(express.json());

app.use(session({
    secret: 'b3e76c5f14135def5d40e6f485f6596fb3e76dc5afb4104c11564e6baebc35dd', 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }  
}));

let products = [
    {id:1,  name: 'iPhone14', price:1200.99,image:'./public/images/ip14.jpg' },
    {id:2, name: 'iphone15', price:1350.99, image:'./public/images/ip15.jpg'}
]

function checkAuth(req, res, next) {
    if (!req.session.isAuthenticated) {
        return res.redirect('/login');
    } else {
        next();
    }
}

app.get('/', checkAuth, (req, res) => {
    res.render('index', { products }); 
});


app.get('/login', (req, res) => {
    res.render('login', { error: null }); 
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === process.env.USERNAME && password === process.env.PASSWORD) {
        req.session.isAuthenticated = true;
        res.redirect('/');
    } else {
        res.render('login', { error: "Invalid credentials" });
    }
});


app.get('/:id', checkAuth, (req, res)=>{
    const product = products.find(p => p.id == req.params.id);
    if(product){
        res.render('product', {product});
    }
    else{
        res.status(404).send('product not found');
    }
})

app.get('/add', checkAuth, (req, res) => {
    
    console.log('User authenticated:', req.session.isAuthenticated); // Kiểm tra xem người dùng đã xác thực chưa
    res.render('add');
});

app.post('/add', checkAuth, (req,res)=>{
    const{name, price, image, description} = req.body;
    const newProduct = {
        id:products.length+1,
        name,
        price: parseFloat(price),
        image,
        description
    };

    products.push(newProduct);
    res.redirect('/')
})

// Edit product page
app.get('/edit/:id', checkAuth, (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    res.render('edit', { product });
  });
  
  app.post('/edit/:id', checkAuth, (req, res) => {
    const { name, price, image, description } = req.body;
    const productIndex = products.findIndex(p => p.id == req.params.id);
    if (productIndex !== -1) {
      products[productIndex] = { id: parseInt(req.params.id), name, price: parseFloat(price), image, description };
      res.redirect('/');
    } else {
      res.status(404).send('Product not found');
    }
  });
  
  // Delete product
  app.post('/delete/:id', checkAuth, (req, res) => {
    products = products.filter(p => p.id != req.params.id);
    res.redirect('/');
  });

app.listen(port, ()=>{
    console.log('app is running at port '+ port);
})