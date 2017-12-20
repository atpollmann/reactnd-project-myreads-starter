import React, { Component } from 'react'
import BookControl from '../book/BookControl'

class Shelf extends Component {
  
  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        {this.props.books.map((book) => (
          <div key={book.id}>
            <img src={book.imageLinks.smallThumbnail} alt={book.name}/>
            <p>{book.title}</p>
            <small>{book.authors.toString()}</small>
            <BookControl
              shelfList={this.props.shelfList}
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
