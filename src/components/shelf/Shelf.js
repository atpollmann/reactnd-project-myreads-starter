import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Book from "../book/Book"
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  shelf: {
    marginTop: 30
  }
})


class Shelf extends Component {
  
  render() {
    
    const { classes } = this.props
    
    return (
      <div className={classes.shelf}>
        <Typography gutterBottom paragraph type="display1">{this.props.name}</Typography>
        
        <Grid
          container
          justify="center"
          spacing={Number(16)}
        >
          {this.props.books.map((book) => (
            <Grid key={book.id} item>
              <Book
                book={book}
                updateLibrary={this.props.updateLibrary}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Shelf)
