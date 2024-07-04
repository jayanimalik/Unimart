// index.js
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import CORS middleware
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB:', err));

const subscriptionSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  upi_id: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const Product = mongoose.model('Product', productSchema);

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Subscription Route
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;

  try {
    const existingSubscription = await Subscription.findOne({ email });
    if (existingSubscription) {
      return res.status(400).send('This email is already subscribed');
    }

    const newSubscription = new Subscription({ email });
    await newSubscription.save();
    res.status(201).send('Subscription successful');
  } catch (error) {
    console.error('Error subscribing:', error);
    res.status(500).send(`Error subscribing: ${error.message}`);
  }
});

// Product Routes
app.post('/api/products', async (req, res) => {
  const { name, description, imageUrl, price, category, upi_id, quantity } = req.body;

  try {
    const newProduct = new Product({ name, description, imageUrl, price, category, upi_id, quantity });
    await newProduct.save();
    res.status(201).send('Product added successfully');
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).send(`Error adding product: ${error.message}`);
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send(`Error fetching products: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
