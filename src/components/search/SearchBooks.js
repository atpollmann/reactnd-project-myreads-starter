import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from '../../utils/BooksAPI'
import Book from '../book/Book'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import Toolbar from 'material-ui/Toolbar'
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
  }
})

class SearchBooks extends React.Component {
  
  state = {
    query: '',
    books: [],
    loading: false
  }
  
  doSearch() {
    this.setState({loading: true})
    BooksAPI.search(this.state.query).then(books => {
      if(!books.error) {
        this.setState({
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
