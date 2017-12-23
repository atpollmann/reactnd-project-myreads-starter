import React, { Component } from 'react'
import * as BooksAPI from '../../utils/BooksAPI'
import { withStyles } from 'material-ui/styles'
import Shelves from "../shelf/Shelves"
import Button from 'material-ui/Button'
import Menu, { MenuItem } from 'material-ui/Menu'
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown'
import { CircularProgress } from 'material-ui/Progress'

const styles = theme => ({
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  fabProgress: {
    color: theme.palette.primary,
    position: 'absolute',
    top: -5,
    left: 67,
    zIndex: 1,
  }
})

/**
 * Shows the controls fot a book (adds, removes,
 * or moves a book from shelves)
 * Implements a progress of operation
 * indicator
 * @Component
 */
class BookControl extends Component {
  
  state = {
    shelf: Shelves.getShelf(this.props.book.shelf) || "none",
    anchorEl: null,
    open: false,
    loading: false
  }
  
  /**
   * Handles the click on the control button
   * @param e - Event object
   */
  handleClick = e => {
    this.setState({
      open: true,
      anchorEl: e.currentTarget
    })
  }
  
  /**
   * Handles the dialog close and calls
   * the book update server call
   * @param e - Event object
   */
  handleClose = e => {
    const shelfId = e.target.getAttribute('value');
    this.setState({ open: false })
    if(shelfId) {
      this.setState({ loading: true })
      BooksAPI.update(this.props.book, shelfId).then(() => {
        this.setState({
          loading: false,
          shelf: Shelves.getShelf(shelfId)
        })
        this.props.updateLibrary(this.props.book, shelfId)
      })
    }
  }
  
  render() {
    
    const { shelf, open, anchorEl, loading } = this.state
    const { classes } = this.props
    
    return (
      <div>
        <div className={classes.wrapper}>
          <Button
            fab
            mini
            color="accent"
            onClick={this.handleClick}
          >
            <KeyboardArrowDown/>
          </Button>
          {loading && <CircularProgress size={50} className={classes.fabProgress} />}
        </div>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem disabled>Move to...</MenuItem>
          {Shelves.getShelfList().map(_shelf => (
            <MenuItem
              key={_shelf.id}
              value={_shelf.id}
              onClick={this.handleClose}
              selected={shelf ? _shelf.id === shelf.id : false}
            >
              {_shelf.name}
            </MenuItem>
          ))}
          <MenuItem key="none" value="none" onClick={this.handleClose}>none</MenuItem>
        </Menu>
      </div>
    )
  }
}

export default withStyles(styles)(BookControl)
