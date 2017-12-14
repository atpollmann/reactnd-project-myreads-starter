import React from 'react'
import { Link } from 'react-router-dom'
import Shelve from './Shelve'

class Shelves extends React.Component {
  
  render() {
    return (
      <div>
        <Shelve name="Currently reading"/>
        <Shelve name="Want to Read"/>
        <Link to="/search">Search books</Link>
      </div>
    )
  }
}

export default Shelves