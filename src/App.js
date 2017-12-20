import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './components/search/SearchBooks'
import * as BooksAPI from './utils/BooksAPI'
import Shelves from "./components/shelf/Shelves"

class BooksApp extends Component {
  
  state = {
    books: []
  }
  
  moveBook = (book, shelfId) => {
    BooksAPI.update(book, shelfId).then(
      () => {
        const myBook = this.state.books.filter(b => {
          return b.id === book.id
        })
        
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
        <Route path="/search" render={() => (
          <SearchBooks
            myBooks={this.state.books}
            moveBook={this.moveBook}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp