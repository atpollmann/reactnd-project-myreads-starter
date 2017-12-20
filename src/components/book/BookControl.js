import React, { Component } from 'react'
import Shelves from "../shelf/Shelves"

class BookControl extends Component {
  
  state = {
    shelf: this.props.book.shelf
  }
  
  moveBook = (e) => {
    this.setState({
      shelf: e.target.value
    })
    this.props.moveBook(this.props.book, e.target.value)
  }
  
  render() {
    return (
      <div>
        <select
          name="shelve"
          value={this.state.shelf}
          onChange={this.moveBook}
        >
          <option value="none" disabled>Move to...</option>
          {Shelves.getShelfList().map((shelf, index) => (
            <option
              key={index}
              value={shelf.id}
            >{shelf.name}</option>
          ))}
          <option value="none">none</option>
        </select>
      </div>
    )
  }
  
}

export default BookControl
