import React from 'react'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'

class Shelves extends React.Component {
  
  render() {
    const shelfList = [
      { id: "currentlyReading", name: "Currently reading" },
      { id: "wantToRead", name: "Want to Read" },
      { id: "read", name: "Read" },
    ]
    
    return (
      <div>
        {shelfList.map((shelf) => (
          <Shelf
            key={shelf.id}
            name={shelf.name}
            books={this.props.books.filter((book) => (book.shelf === shelf.id))}
            shelfList={shelfList}
            moveBook={this.props.moveBook}
          />
        ))}
        <Link to="/search">Search books</Link>
      </div>
    )
  }
}

export default Shelves