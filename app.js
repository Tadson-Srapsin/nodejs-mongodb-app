require('dotenv').config()
const express = require('express');
const req = require('express/lib/request');
const mongoose = require('mongoose')

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB Atlas!');
})
.catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
})

app.use(express.json());

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    price: {
        type: Number,
        required: true
    },
    description: String
})

const Product = mongoose.model('Product', productSchema);


app.get('/', (req, res) => {
    res.send('Product API is running!');
})

// Create a new product (POST/p)
app.post('/products', async(req, res) => {
    try {
        const newProduct = new Product(req.body);
        const saveProduct = await newProduct.save();
        res.status(201).json(saveProduct);
    }
    catch(err) {
        res.status(400).json({message: err.message})
    }
})


// Get all Products
app.get('/products', async(req, res) => {
    try {
        const products = await Product.find();
        res.json(products)
    }
    catch(err) {
        res.status(500).json({message: err.message})
    }
})


// Get single product by ID (GET /products/:id)
app.get('/products/:id', async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({message: 'Product not found!'});
        } else {
            res.json(product);
        }
        
    }
    catch(err) {
        res.status(500).json({message: err.message})
    }
})


// Update product by id
app.patch('/products/:id', async(req, res) => {
    try {
        const updatedproduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!updatedproduct) {
            return res.status(404).json({message: 'Product not found!'});
        } else {
            res.json(updatedproduct);
        }
        
    }
    catch(err) {
        res.status(400).json({message: err.message})
    }
})


// Delete product by ID
app.delete('/products/:id', async(req, res) => {
    try {
        const deletedproduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedproduct) {
            return res.status(404).json({message: 'Product not found!'});
        } else {
            res.json({message: 'Product deleted'});
        } 
    }
    catch(err) {
        res.status(500).json({message: err.message})
    }
})



app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


