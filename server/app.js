require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
// const db = require('../db');
const pg = require('../db/postgreSQL/index.js');

const app = express();


// app.get('*.gz', (req, res, next) => {
//   res.set('Content-Encoding', 'gzip');
//   res.set('Content-Type', 'text/javascript');
//   next();
//  });


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/books/:id', express.static(path.join(__dirname, '/../public')));

// get and post routes to interact with database here

// get all reviews for specific book id
app.get('/books/:id/reviews', async (req, res) => {
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
    const posted = await pg.postReview(review, rating, id, user_id);
    res.json(posted);
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


module.exports = app;
