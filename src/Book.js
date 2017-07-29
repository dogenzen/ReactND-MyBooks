import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    shelf: PropTypes.string.isRequired,
    onBookshelfUpdate: PropTypes.func.isRequired,
  }

  updateShelf(value) {
    this.props.onBookshelfUpdate(this.props.book, value)
  }

  render() {
    const { book, shelf } = this.props

    let thumbnail = ""
    if (book && "imageLinks" in book && "thumbnail" in book.imageLinks) {
        thumbnail = book.imageLinks.thumbnail
    }
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
            style={{ width: 128,
                     height: 193,
                     backgroundImage: `url("${thumbnail}")`}}>
          </div>
          <div className="book-shelf-changer">
            <select value={shelf}
              onChange={(event) => this.updateShelf(event.target.value)}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading </option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title ? book.title : ""}</div>
        <div className="book-authors">{book.authors ? book.authors[0] : ""}</div>
      </div>
    )
  }
}

export default Book
