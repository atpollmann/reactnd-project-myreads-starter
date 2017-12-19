import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Shelves from './components/shelve/Shelves'
import SearchBooks from './components/search/SearchBooks'
import * as BooksAPI from './utils/BooksAPI'

class BooksApp extends Component {
  
  state = {
    books: []
  }
  
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }
  
  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
            <Shelves
              books={this.state.books}
            />
          )
        } />
        <Route path="/search" component={SearchBooks}/>
      </div>
    )
  }
}

export default BooksApp