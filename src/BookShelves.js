import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Book from './Book'


class BookShelf extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string,
    books: PropTypes.array.isRequired,
    onBookshelfUpdate: PropTypes.func.isRequired
  }

  render() {
    const { type, title, books, onBookshelfUpdate } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  shelf={type}
                  onBookshelfUpdate={onBookshelfUpdate}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}


class BookShelves extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onBookshelfUpdate: PropTypes.func.isRequired,
  }

  render() {
    const { books, onBookshelfUpdate } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              books={books.filter((book) => book.shelf === 'currentlyReading')}
              type="currentlyReading"
              title="Currently Reading"
              onBookshelfUpdate={onBookshelfUpdate}
            />
            <BookShelf
              books={books.filter((book) => book.shelf === 'wantToRead')}
              type="wantToRead"
              title="Want To Read"
              onBookshelfUpdate={onBookshelfUpdate}
            />
            <BookShelf
              books={books.filter((book) => book.shelf === 'read')}
              type="read"
              title="Read"
              onBookshelfUpdate={onBookshelfUpdate}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookShelves
