import React from 'react'
import { Component } from 'react'
import { Route } from 'react-router-dom'
import Shelves from './Shelves'
import SearchBooks from './SearchBooks'

class BooksApp extends Component {
  
  render() {
    return (
      <div>
        <Route exact path="/" component={Shelves} />
        <Route path="/search" component={SearchBooks}/>
      </div>
    )
  }
}

export default BooksApp