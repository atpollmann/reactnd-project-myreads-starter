import React from 'react'
import Shelf from './Shelf'

import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'

const styles = theme => ({
  addBook: {
    margin: theme.spacing.unit,
    color: "white"
  },
  flex: {
    flex: 1
  }
})

class Shelves extends React.Component {
  
  static getShelfList() {
    return [
      { id: "currentlyReading", name: "Currently reading" },
      { id: "wantToRead", name: "Want to Read" },
      { id: "read", name: "Read" },
    ]
  }
  
  render() {
    
    const { classes } = this.props
  
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography type="title" color="inherit" className={classes.flex}>
              My Reads
            </Typography>
            <Button
              fab
              color="accent"
              aria-label="Search for books"
              className={classes.addBook}
              href="/search"
              title="Search for books"
            >
              <AddIcon/>
            </Button>
          </Toolbar>
        </AppBar>
        {Shelves.getShelfList().map((shelf) => (
          <Shelf
            key={shelf.id}
            name={shelf.name}
            books={this.props.books.filter((book) => (book.shelf === shelf.id))}
            moveBook={this.props.moveBook}
          />
        ))}
      </div>
    )
  }
}

export default withStyles(styles)(Shelves)