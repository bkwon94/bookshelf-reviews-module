import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import AppRouter from './router.jsx';
import Reviews from './components/Reviews.jsx';
import RatingDetails from './components/RatingDetails.jsx';
import Filter from './components/Filter.jsx'
import AddReview from './components/AddReview.jsx'
import style from './sample.less';
// hi
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      users: [],
      ratings: [],
      rating: 0,
      ratedReviews: [],
      id: this.props.match.params.id,
      five: 0,
      four: 0,
      three: 0,
      two: 0,
      one: 0,
      all: 0,
      averageRating: 0,
      usersReceived: false
    };
    this.handleReviews = this.handleReviews.bind(this);
    this.updateReviews = this.updateReviews.bind(this);
    this.sortByRating = this.sortByRating.bind(this);
  }


  async componentDidMount() {
    await this.getAllReviews();
    await this.getUsersForReviews();
    await this.sortByRating();
    await this.average();
  }

  async getAllReviews() {
    const allRatings = [];
    await $.get(`/books/${this.state.id}/reviews`, (data) => {
      data.map((review) => {
        allRatings.push(review.rating);
      });
      this.setState({ reviews: data })
    });
    await this.setState({ ratings: allRatings })
  }

  // getAllUsers() {
  //   $.get(`/books/${this.state.id}/reviews/users`, (data) => {
  //     this.setState({
  //       users: data
  //     });
  //   });
  // }

    getUsersForReviews() {
    this.state.reviews.forEach(review => {

       $.get(`/books/${review.user_id}/reviews/users`, (data) => {
        this.state.users.push(data);
        this.setState({ users: this.state.users })
      })

    });
  }

  getRatedReviews(rating) {
    $.get(`/books/${this.state.id}/reviews/rating/${this.state.rating}`, (data) => {
      this.setState({
        ratedReviews: data
      });
    });
  }

  updateReviews(postedReview) {
    this.setState(prevState => ({
      reviews: [postedReview, ...prevState.reviews],
    }));
    this.getAllReviews();
    // QUESTION: why won't my page rerender without calling another get request even though I am updating the state on my main index.jsx file???
  }

  async handleReviews(selectedRating) {
    await this.setState({ rating: selectedRating });
    await this.getRatedReviews(this.state.rating);
  }

  sortByRating() {
    const { ratings } = this.state;
    ratings.map((rating) => {
      if (rating === 5) {
        const current = this.state.five;
        this.setState({ five: (current + 1) });
      }
      if (rating === 4) {
        const current = this.state.five;
        this.setState({ four: (current + 1) });
      }
      if (rating === 3) {
        const current = this.state.five;
        this.setState({ three: (current + 1) });
      }
      if (rating === 2) {
        const current = this.state.five;
        this.setState({ two: (current + 1) });
      }
      if (rating === 1) {
        const current = this.state.five;
        this.setState({ one: (current + 1) });
      }
      const allRatings = this.state.ratings
      const count = allRatings.length;
      this.setState({ all: count });
    });
  }

  average() {
    const { ratings } = this.state;
    const sumRatings = ratings.reduce((acc, val) => acc + val);
    let average = sumRatings / (ratings.length);
    average = +average.toFixed(2);
    this.setState({ averageRating: average });
  }

  render() {
    const { reviews, ratings, ratedReviews, users, rating, averageRating, id } = this.state;

    return (
      <div className={style.container}>
        <RatingDetails
          reviews={reviews}
          ratings={ratings}
          average={averageRating}
        />
        <br />
        <div className={style.align}>
          <Filter
            reviews={reviews}
            ratings={ratings}
            onSelectRating={this.handleReviews}
            five={this.state.five}
            four={this.state.four}
            three={this.state.three}
            two={this.state.two}
            one={this.state.one}
            all={this.state.all}
          />
          <span>|</span>
          <a href='#' className={style.styledLink}>Sort order</a>
          <span className={style.search}>
            <input className={style.searchInput} placeholder="Search review text" />
          </span>
        </div>
        <hr />
        <br />
        <div>
          <Reviews
            rating={rating}
            ratedReviews={ratedReviews}
            reviews={reviews}
            users={users}
            id={id}
            getAllReviews={this.getAllReviews}
          />
        </div>
        <AddReview
          id={id}
          onUpdate={this.updateReviews}
        />
      </div>
    );
  }
}

export default App;

ReactDOM.render(<AppRouter />, document.getElementById('reviews'));
