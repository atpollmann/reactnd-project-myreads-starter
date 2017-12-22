import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './components/search/SearchBooks'
import * as BooksAPI from './utils/BooksAPI'
import Shelves from "./components/shelf/Shelves"

class BooksApp extends Component {
  
  state = {
    books: []
  }
  
  updateLibrary = (book, shelfId) => {
    const myBook = this.state.books.filter(b => b.id === book.id)
  
    let newState = []
  
    if(myBook.length === 0) {
      book.shelf = shelfId
      newState = this.state.books.concat(book);
    
    } else {
      newState = this.state.books.map(function(b) {
        if(b.id === book.id) {
          b.shelf = shelfId
        }
        return b;
      })
    }
  
    this.setState({
      books: newState
    })
    
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
              updateLibrary={this.updateLibrary}
            />
          )
        } />
        <Route path="/search" render={() => (
          <SearchBooks
            myBooks={this.state.books}
            updateLibrary={this.updateLibrary}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp