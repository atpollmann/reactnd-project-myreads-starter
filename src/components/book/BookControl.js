import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Shelves from "../shelf/Shelves"
import Button from 'material-ui/Button'
import Menu, { MenuItem } from 'material-ui/Menu'
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown'

const styles = theme => ({
  selectedItem: {
    background: theme.palette.primary['A400']
  }
})

class BookControl extends Component {
  
  state = {
    shelf: Shelves.getShelf(this.props.book.shelf) || "none",
    anchorEl: null,
    open: false
  }
  
  moveBook = e => {
    this.setState({
      shelf: Shelves.getShelf(e.target.value)
    })
    this.props.moveBook(this.props.book, e.target.value)
  }
  
  handleClick = e => {
    this.setState({
      open: true,
      anchorEl: e.currentTarget
    })
  }
  
  handleClose = e => {
    const shelfId = e.target.getAttribute('value');
    if(shelfId) {
      this.setState({
        shelf: Shelves.getShelf(shelfId)
      })
      this.props.moveBook(this.props.book, shelfId)
    }
    this.setState({
      open: false
    })
  
  }
  
  render() {
    
    const { shelf, open, anchorEl } = this.state
    
    return (
      <div>
        <Button
          fab
          mini
          color="accent"
          onClick={this.handleClick}
        >
          <KeyboardArrowDown/>
        </Button>
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
