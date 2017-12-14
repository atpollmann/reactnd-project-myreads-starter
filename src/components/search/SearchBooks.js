import React from 'react'
import { Link } from 'react-router-dom'

class SearchBooks extends React.Component {
  
  render() {
    return (
      <div>
        <h4>Here shall be thy search of books</h4>
        <Link to="/">Go back</Link>
      </div>
    )
  }
}

export default SearchBooks