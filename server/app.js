require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const pg = require('../db/postgreSQL/index.js');
const cache = require('express-redis-cache')();


const app = express();

// BUNDLE COMPRESSION FOR EC2 INSTANCE OPTIMIZATION
app.get('*.gz', (req, res, next) => {
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
 });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/books/:id', cache.route(), express.static(path.join(__dirname, '/../public')));


// get all reviews for specific book id
// app.get('/books/:id/reviews', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const reviews = await pg.getReviews(id);
//     console.log(reviews);
//     res.json(reviews);
//   } catch (err) {
//     res.json(err);
//   }
// });

// WITH REDIS CACHE
app.get('/books/:id/reviews', cache.route(), async (req, res) => {
  const { id } = req.params;
  try {
    const reviews = await pg.getReviews(id);
    console.log(reviews);
    res.json(reviews);
  } catch (err) {
    res.json(err);
  }
});

// get reviews for specific book w/ specific rating
app.get('/books/:id/reviews/rating/:rating', async (req, res) => {
  const { id, rating } = req.params;
  try {
    const ratedReviews = await pg.getRatedReviews(id, rating);
    res.json(ratedReviews);
  } catch (err) {
    res.json(err);
  }
});

// get all users
app.get('/books/:id/reviews/users', async (req, res) => {
  const { id } = req.params;
  try {
    const users = await pg.getAllUsers(id);
    res.json(users);
  } catch (err) {
    res.json(err);
  }
});

// post review for specific book and send back updated reviews
app.post('/books/:id/reviews', async (req, res) => {
  const { id } = req.params;
  const { rating, review, user_id } = req.body;
  try {
    await pg.postReview(review, rating, id, user_id);
    await res.end();
  } catch (err) {
    console.log(err);
  }
});

// increment likes when someone likes a review
app.put('/books/:id/reviews', async (req, res) => {
  const { reviewId } = req.body;
  try {
    await pg.addLike(reviewId);
    res.json();
  } catch (err) {
    console.log(err);
  }
});

app.delete('/books/:id/reviews', async (req, res) => {
  const { id } = req.params;
  try {
    const del = await pg.deleteReviews(id);
    res.json(del);
  } catch (err) {
    res.json(err);
  }
});

// LOADER APPROVAL
app.get('/loaderio-02d08b70ea4b92a400442c2498e498af', (req, res) => {
  res.send('loaderio-02d08b70ea4b92a400442c2498e498af');
  res.end();
});

module.exports = app;
