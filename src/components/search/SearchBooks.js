import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from '../../utils/BooksAPI'
import Book from '../book/Book'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui-icons/ArrowBack'
import Tooltip from 'material-ui/Tooltip'
import { LinearProgress } from 'material-ui/Progress'

const styles = {
  grid: {
    marginTop: 100
  },
  progressContainer: {
    marginLeft: -8,
    zIndex: 2000,
    position: "fixed",
    top: 0,
    width: "100%"
  },
  noBooks: {
    marginTop: 100,
    textAlign: "center"
  }
}

/**
 * Displays the book search
 * Implements a progress indicator
 * Implements a debounced input so the
 * app does not make unnecessary
 * requests to the server
 * If no books are found, shows a
 * not found message
 * @Component
 */
class SearchBooks extends React.Component {
  
  state = {
    query: '',
    books: [],
    loading: false,
    foundBooks: true
  }
  
  /**
   * A debounce timeout id
   * @type {number | null}
   */
  debounce = null
  
  /**
   * Makes the actual search of books based
   * on the query state
   */
  doSearch() {
    this.setState({loading: true})
    BooksAPI.search(this.state.query).then(books => {
      if(!books.error) {
        this.setState({
          foundBooks: true,
          books: books.map(book => {
            const myBook = this.props.myBooks.filter(myBook => myBook.id === book.id)
            if(myBook[0]) {
              book.shelf = myBook[0].shelf
            }
            return book
          }),
          loading: false
        })
      } else {
        this.clearBooks()
        this.setState({
          foundBooks: false
        })
      }
    })
  }
  
  clearBooks() {
    this.setState({books: [], loading: false, foundBooks: true})
  }
  
  /**
   * Updates the query state and triggers
   * the search or clear methods based on
   * the content of the query
   *
   * Each time this method is called, assigns
   * a new timeout of one second to the debounce
   * property. When the timeout is finish then it
   * calls the corresponding methods
   *
   * Allows only queries larger than 3 characters
   * @param {string} query
   */
  updateQuery = (query) => {
    if((query.length >= 3 || query.trim() === '')) {
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        this.setState({query}, () => {
          this.debounce = null
          if(query) {
            this.doSearch()
          } else {
            this.clearBooks()
          }
        })
      }, 1000)
    }
  }
  
  render() {
    
    const { books, loading } = this.state
    const { moveBook, classes } = this.props
    
    return (
      <div>
        <div className={classes.progressContainer} hidden={!loading}>
          <LinearProgress mode="indeterminate" color="accent" />
        </div>
        <AppBar color="inherit">
          <Toolbar>
            <Route render={({ history }) => (
              <Tooltip title="Go back" placement="bottom">
                <IconButton onClick={() => history.goBack()}>
                  <ArrowBack/>
                </IconButton>
              </Tooltip>
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
        {this.state.foundBooks ? null : (
          <div className={classes.noBooks}>
            <Typography type="display2" paragraph>No books found</Typography>
          </div>
        )}
        <Grid
          container
          justify='center'
          spacing={Number(16)}
          className={classes.grid}
        >
          {books.map(book => (
            <Grid key={book.id} item>
              <Book
                book={book}
                moveBook={moveBook}
                updateLibrary={this.props.updateLibrary}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(SearchBooks)
