import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from '../../utils/BooksAPI'
import Book from '../book/Book'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui-icons/ArrowBack'

const styles = (theme) => {

}

class SearchBooks extends React.Component {
  
  state = {
    query: '',
    books: []
  }
  
  doSearch() {
    BooksAPI.search(this.state.query).then(books => {
      if(!books.error) {
        this.setState({
          books: books.map(book => {
            const myBook = this.props.myBooks.filter(myBook => myBook.id === book.id)
            if(myBook[0]) {
              book.shelf = myBook[0].shelf
            }
            return book
          })
        })
      } else {
        this.clearBooks()
      }
    })
  }
  
  clearBooks() {
    this.setState({books:[]})
  }
  
  updateQuery = (query) => {
    if(query.length >= 3 || query.trim() === '') {
      setTimeout(() => {
        this.setState({query}, () => {
          if(query) {
            this.doSearch()
          } else {
            this.clearBooks()
          }
        })
      }, 500)
    }
  }
  
  render() {
    
    const {query, books} = this.state
    const {moveBook} = this.props
    
    return (
      <div>
        <AppBar color="inherit">
          <Toolbar>
            <Route render={({ history }) => (
              <IconButton
                onClick={() => history.goBack()}
              >
                <ArrowBack/>
              </IconButton>
            )} />
            <TextField
              fullWidth
              label="Search by title or author"
              type="search"
              margin="normal"
              onChange={(event) => {
                this.updateQuery(event.target.value)
              }}
            />
          </Toolbar>
        </AppBar>
        {books.map(book => (
          <Book
            key={book.id}
            book={book}
            moveBook={moveBook}
            updateLibrary={this.props.updateLibrary}
          />
        ))}
        
      </div>
    )
  }
}

export default withStyles(styles)(SearchBooks)
