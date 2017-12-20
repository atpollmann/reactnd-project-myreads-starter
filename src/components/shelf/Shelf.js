import React, { Component } from 'react'
import Book from "../book/Book"

class Shelf extends Component {
  
  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        {this.props.books.map((book) => (
          <div key={book.id}>
            <Book
              book={book}
              moveBook={this.props.moveBook}
            />
          </div>
        ))}
      </div>
    )
  }
}

export default Shelf
