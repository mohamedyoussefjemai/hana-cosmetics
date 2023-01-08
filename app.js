require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');

// import routes
const categoryRoute = require('./routes/category.route.js');
const subCategoryRoute = require('./routes/sub-category.route');
const productRoute = require('./routes/product.route');
const activityRoute = require('./routes/activity.route.js');
const shopRoute = require('./routes/shops.route.js');
const socialRoute = require('./routes/social.route.js');
const homepageRoute = require('./routes/homepage.route.js');
const footerRoute = require('./routes/footer.route.js');
const authRoute = require('./routes/auth.route.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static('uploads'));
app.use('/images', express.static('uploads'));

app.use('/api/categories', categoryRoute);
app.use('/api/sub-categories', subCategoryRoute);
app.use('/api/products', productRoute);
app.use('/api/activities', activityRoute);
app.use('/api/shops', shopRoute);
app.use('/api/socials', socialRoute);
app.use('/api/homepage', homepageRoute);
app.use('/api/footer', footerRoute);
app.use('/api/auth', authRoute);

// Heroku
app.use(express.static(path.resolve(__dirname, './client/build')));

mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('mongoose connected');
    app.listen(process.env.PORT, () => {
      console.log(`server run in port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
