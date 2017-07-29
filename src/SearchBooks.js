import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component {
  static propTypes = {
    booksOnShelf: PropTypes.array.isRequired,
    onBookshelfUpdate: PropTypes.func.isRequired,
  }

  state = {
    books: [],
    query: ''
  }

  updateQuery = (query) => {
    console.log("got query.. ", query)
    this.setState({ query });
    if (query) {
      console.log("Searching.. ", query)
      BooksAPI.search(query).then((matchedBooks) => {
        let searchedBooks = []
        if (Array.isArray(matchedBooks)) {
          searchedBooks = matchedBooks;
        }
        if (Array.isArray(matchedBooks.books)) {
          searchedBooks = matchedBooks.books;
        }
        console.log("Resp.. ", SearchBooks)
        if (this.state.books !== searchedBooks) {
          this.setState({ books: searchedBooks });
        }
      })
    } else {
      this.setState({ books: [], query: '' })
    }
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  computeShelf(books, book) {
    let bookId = book.id
    let matchedBook = null
    if (books) {
      matchedBook = books.filter((book) => book.id === bookId)
    }
    let shelf = (matchedBook && matchedBook.length > 0) ? matchedBook[0].shelf : "none"
    return shelf
  }

  render() {
    const { booksOnShelf, onBookshelfUpdate } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              Howver, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  shelf={this.computeShelf(booksOnShelf, book)}
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

export default SearchBooks
