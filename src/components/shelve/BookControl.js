import React, { Component } from 'react'

class BookControl extends Component {
  
  render() {
    return (
      <div>
        <select name="shelve">
          <option value="none" disabled>Move to...</option>
          {this.props.shelfList.map((shelf, index) => (
            <option
              key={index}
              value={shelf.id}
              selected={this.props.book.shelf === shelf.id}
            >{shelf.name}</option>
          ))}
          <option value="none">none</option>
        </select>
      </div>
    )
  }
  
}

export default BookControl
