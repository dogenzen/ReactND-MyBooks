import React from 'react'
import { Route } from 'react-router-dom'
import BookShelves from './BookShelves'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBookshelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((books) => {
      book.shelf = shelf
      //this.setState()
      this.forceUpdate()
    })
  }

  addBook = (book, shelf) => {
    console.log("add book", book, shelf)
    let newBook = Object.assign({}, book);
    BooksAPI.update(newBook, shelf).then((books) => {
      newBook['shelf'] = shelf
      this.state.books.push(newBook)
      this.forceUpdate()
    })
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <BookShelves
            books={this.state.books}
            onBookshelfUpdate={this.updateBookshelf}
          />
        )}/>
        <Route path='/search' render={({ history }) => (
          <SearchBooks
            booksOnShelf={this.state.books}
            onBookshelfUpdate={this.addBook}
          />
        )}/>
      </div>
    )
  }

}

export default BooksApp
