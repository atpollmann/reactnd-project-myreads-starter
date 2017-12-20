import React, { Component } from 'react'
import BookControl from "./BookControl"

class Book extends Component {
  render() {
    
    const { book, moveBook } = this.props
    
    return (
      <div key={book.id}>
        <img src={book.imageLinks.smallThumbnail} alt={book.name}/>
        <p>{book.title}</p>
        <small>{book.authors || book.authors.toString()}</small>
        <BookControl
          book={book}
          moveBook={moveBook}
        />
      </div>
    )
  }
  
}

export default Book