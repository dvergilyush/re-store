import React, { Component } from "react";
import { connect } from "react-redux";
import { booksLoaded, booksRequested, booksFetchError } from "../../actions";

import BookListItem from "../book-list-item";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import { withBookstoreService } from "../hoc";
import { compose } from "../../utils";

import "./book-list.css";

class BookList extends Component {
  componentDidMount() {
    const {
      bookstoreService,
      booksLoaded,
      booksRequested,
      booksFetchError,
    } = this.props;

    booksRequested();
    bookstoreService
      .getBooks()
      .then((data) => booksLoaded(data))
      .catch((error) => booksFetchError(error));
  }

  render() {
    const { books, loading, error } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }

    return (
      <ul className="book-list">
        {books.map((book) => (
          <li key={book.id}>
            <BookListItem book={book} />
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = ({ books, loading, error }) => ({
  books,
  loading,
  error,
});

const mapDispatchToProps = {
  booksLoaded,
  booksRequested,
  booksFetchError,
};

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookList);
