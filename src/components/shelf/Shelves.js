import React from 'react'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'

class Shelves extends React.Component {
  
  static getShelfList() {
    return [
      { id: "currentlyReading", name: "Currently reading" },
      { id: "wantToRead", name: "Want to Read" },
      { id: "read", name: "Read" },
    ]
  }
  
  render() {
    return (
      <div>
        {Shelves.getShelfList().map((shelf) => (
          <Shelf
            key={shelf.id}
            name={shelf.name}
            books={this.props.books.filter((book) => (book.shelf === shelf.id))}
            moveBook={this.props.moveBook}
          />
        ))}
        <Link to="/search">Search books</Link>
      </div>
    )
  }
}

export default Shelves