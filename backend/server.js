const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const DBconnect = require('./DataConnect/DBconnect');
const loginRoutes = require("./Routes/loginRoutes");
const productRoutes = require('./Routes/productRoutes');
const orderRoutes = require("./Routes/productorderRoutes");


const app = express();
dotenv.config();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
})); 

const PORT = process.env.PORT || 6000;

app.use("/api/auth", loginRoutes);
app.use('/api/admin', productRoutes);
app.use("/api/orders", orderRoutes);

DBconnect();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
