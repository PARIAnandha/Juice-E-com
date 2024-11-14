const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const DBconnect = require('./DataConnect/DBconnect');
const loginRoutes = require("./Routes/loginRoutes");
const productRoutes = require('./Routes/productRoutes');


const app = express();
dotenv.config();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
})); 

const PORT = process.env.PORT || 30;

app.use("/api/auth", loginRoutes);
app.use('/api/admin', productRoutes);

DBconnect();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
