
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongo');
require('./config/mysql'); 
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/orders', require('./routes/order.routes'));

app.get('/', (req, res) => {
  res.send('Backend running');
});
connectDB();
app.listen(3000, () => console.log('Server started on port 3000'));
