import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './components/search/SearchBooks'
import * as BooksAPI from './utils/BooksAPI'
import Shelves from "./components/shelf/Shelves"
import SnackBar from 'material-ui/Snackbar'

/**
 * Higher component. Start point of the application
 * @Component
 */
class BooksApp extends Component {
  
  state = {
    books: [],
    snackOpen: false,
    snackMsg: ''
  }
  
  /**
   * Adds or moves the book from shelfs
   * @param {Book} book
   * @param {string} shelfId
   */
  updateLibrary = (book, shelfId) => {
    if(book.shelf && (shelfId === 'none')) return this.removeBook(book)
    else if(book.shelf) {
      book.shelf = shelfId
      const myBook = this.state.books.filter(b => b.id === book.id)
      myBook.length === 0 ? this.addBook(book) : this.moveBook(book, shelfId)
    }
  }
  
  /**
   * @param {Book} book
   */
  addBook = (book) => {
    this.setState({
      books: this.state.books.concat(book),
      snackMsg: 'Book added to shelf "' + Shelves.getShelf(book.shelf).name + '"',
      snackOpen: true
    })
  }
  
  /**
   * @param {Book} book
   * @param {string} newShelf
   */
  moveBook = (book, newShelf) => {
    this.setState({
      books: this.state.books.map(b => {
        if(b.id === book.id) {
          b.shelf = newShelf
        }
        return b
      }),
      snackMsg: 'Book moved to shelf "' + Shelves.getShelf(newShelf).name + '"',
      snackOpen: true
    })
  }
  
  /**
   *
   * @param {Book} book
   */
  removeBook = (book) => {
    this.setState({
      books: this.state.books.filter(b => b.id !== book.id),
      snackMsg: 'Book removed from library',
      snackOpen: true
    })
  }
  
  hideSnack = () => {
    this.setState({ snackOpen: false })
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
              message={snackMsg}
              onClose={this.hideSnack}
              />
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp