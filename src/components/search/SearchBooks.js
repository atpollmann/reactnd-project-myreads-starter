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

const styles = (theme) => ({
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
})

class SearchBooks extends React.Component {
  
  state = {
    query: '',
    books: [],
    loading: false,
    debounce: 0,
    foundBooks: true
  }
  
  debounce = null
  
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
