import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

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

// Products Schema
const productSchema = new mongoose.Schema({
  sellerName: { type: String, required: true },
  productName: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  hostel: { type: String, required: true },
});

const Product = mongoose.model('Product', productSchema);

// Products Route
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send(`Error fetching products: ${error.message}`);
  }
});

// Wishlist Schema
const wishlistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  hostel: { type: String, required: true },
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

// Add to Wishlist
app.post('/api/wishlist/add', async (req, res) => {
  try {
    const { userId, productName, description, price, imageUrl, hostel } = req.body;

    const newWishlistItem = new Wishlist({ userId, productName, description, price, imageUrl, hostel });
    await newWishlistItem.save();
    res.status(201).send('Product added to wishlist');
  } catch (error) {
    console.error('Error adding product to wishlist:', error);
    res.status(500).send(`Error adding product to wishlist: ${error.message}`);
  }
});

// Remove from Wishlist
app.delete('/api/wishlist/remove/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Wishlist.findByIdAndRemove(id);
    res.status(200).send('Product removed from wishlist');
  } catch (error) {
    console.error('Error removing product from wishlist:', error);
    res.status(500).send(`Error removing product from wishlist: ${error.message}`);
  }
});

// Fetch Wishlist
app.get('/api/wishlist/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const wishlist = await Wishlist.find({ userId });
    res.status(200).json(wishlist);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).send(`Error fetching wishlist: ${error.message}`);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
