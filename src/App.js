import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './components/search/SearchBooks'
import * as BooksAPI from './utils/BooksAPI'
import Shelves from "./components/shelf/Shelves"
import SnackBar from 'material-ui/Snackbar'

class BooksApp extends Component {
  
  state = {
    books: [],
    snackOpen: false,
    snackMsg: ''
  }
  
  _showSnack(msg) {
    this.setState({
      snackOpen: true,
      snackMsg: msg
    })
  }
  
  _hideSnack = () => {
    this.setState({
      snackOpen: false
    })
  }
  
  updateLibrary = (book, shelfId) => {
    const myBook = this.state.books.filter(b => b.id === book.id)
  
    let newState = []
    let verb = ""
    let shelfName = Shelves.getShelf(shelfId).name
    
    if(myBook.length === 0) {
      book.shelf = shelfId
      newState = this.state.books.concat(book);
      verb = 'added'
    } else {
      newState = this.state.books.map(function(b) {
        if(b.id === book.id) {
          b.shelf = shelfId
        }
        return b;
      })
      verb = 'moved'
    }
    this._showSnack(`Book ${verb} to shelf ${shelfName}`)
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
    
    const { snackOpen, snackMsg } = this.state
    
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
          <div>
            <SearchBooks
              myBooks={this.state.books}
              updateLibrary={this.updateLibrary}
            />
            <SnackBar
              anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
              open={snackOpen}
              onClose={this._hideSnack}
              message={snackMsg}
              />
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp