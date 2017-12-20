import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Shelves from './components/shelve/Shelves'
import SearchBooks from './components/search/SearchBooks'
import * as BooksAPI from './utils/BooksAPI'

class BooksApp extends Component {
  
  state = {
    books: []
  }
  
  moveBook = (book, shelfId) => {
    BooksAPI.update(book, shelfId).then(
      () => {
        this.setState({
          books: this.state.books.map(function(b) {
            if(b.id === book.id) {
              b.shelf = shelfId
            }
            return b;
          })
        })
      }
    )
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
              moveBook={this.moveBook}
            />
          )
        } />
        <Route path="/search" component={SearchBooks}/>
      </div>
    )
  }
}

export default BooksApp