import React from 'react'
import Shelf from './Shelf'
import { Route } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import AddCircle from 'material-ui-icons/AddCircle'
import Tooltip from 'material-ui/Tooltip'
import IconButton from 'material-ui/IconButton'


const styles = theme => ({
  gridContainer: {
    flexGrow: 1
  },
  addBook: {
    margin: theme.spacing.unit,
    color: "white"
  },
  title: {
    flex: 1
  },
  shelves: {
    marginTop: 100
  },
  appBar: {
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
  
  static getShelf(shelfId) {
    return Shelves.getShelfList().filter(shelf => shelf.id === shelfId)[0]
  }
  
  render() {
    
    const { classes } = this.props
  
    return (
      <div>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography type="title" color="inherit" className={classes.title}>
              My Reads
            </Typography>
            <Tooltip title="Search more books" placement="bottom">
              <Route render={({ history }) => (
                <IconButton
                  onClick={() => history.push('/search')}
                  color="inherit"
                >
                  <AddCircle/>
                </IconButton>
              )} />
            </Tooltip>
          </Toolbar>
        </AppBar>
        <div className={classes.shelves}>
          {Shelves.getShelfList().map((shelf) => (
            <Shelf
              key={shelf.id}
              name={shelf.name}
              books={this.props.books.filter((book) => (book.shelf === shelf.id))}
              updateLibrary={this.props.updateLibrary}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Shelves)