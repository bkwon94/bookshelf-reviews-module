const config = require('../../knexfile.js');
const env = process.env.NODE_ENV || 'development';
// CONNECT TO POSTGRESQL DB
const knex = require('knex')(config[env]);

/* ***** POSTGRESQL HELPER FUNCTIONS ***** */

const getReviews = async(id) => {
  try {
    let reviews = await knex.select()
      .from('reviews')
      .where({ book_id: id });
    console.log(reviews);
    return reviews
  }
  catch(err) {
    throw err;
  }
};

const getRatedReviews = async(id, rating) => {
  try {
    let ratedReviews = await knex.select()
      .from('reviews')
      .where({ book_id: id })
      .andWhere({ rating: rating });
    console.log(ratedReviews);
    return ratedReviews;
  }
  catch(err) {
    throw err;
  }
};


const getUser = async(userId) => {
  try {
    let user = await knex.select('username')
      .from('users')
      .where({ user_id: userId });
    console.log(user);
    return user;
  }
  catch(err) {
    throw err;
  }
};

// maybe refactor so that after reviews loaded, get users by that id
const getAllUsers = async(id) => {
  try {
    console.time('get all users time');
    let users = await knex.select()
      .from('users')
      .where({ user_id: id });
    await console.timeEnd('get all users time');
    await console.log(users[0]);
    return users[0];
  }
  catch(err) {
    throw err;
  }
};

const postReview = async(review, rating, bookId, userId) => {
  try {
    let date = new Date();
    date = date.toString();
    date = date.slice(4, 10) + ', ' + date.slice(11, 15);
    await knex('reviews')
      .insert({
        review: review,
        rating: rating,
        book_id: bookId,
        user_id: userId,
        date: date
      });
      await console.log('Posted');
  }
  catch(err) {
    throw err;
  }
};

const addLike = async(reviewId) => {
  try {
    await knex('reviews')
      .where('id', '=', reviewId)
      .increment('likes', 1)
    await console.log('Updated likes');
  }
  catch(err) {
    throw err;
  }
};

const deleteReviews = async(bookId) => {
  try {
    await knex('reviews')
      .where({ book_id: bookId })
      .del();
  }
  catch(err) {
    throw err;
  }
};

/* TESTING RESULTS IN CONSOLE */
// getReviews(439);
// getRatedReviews(94, 3);
// getUser(9000);
// getAllUsers();
// postReview('Hello this is my review of this awesome book', 3, 2, 33);
// addLike(5);

module.exports = {
  getReviews,
  getRatedReviews,
  getUser,
  getAllUsers,
  postReview,
  addLike,
  deleteReviews
};