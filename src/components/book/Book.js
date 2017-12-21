import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import BookControl from './BookControl'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Img from 'react-image'
import { CircularProgress } from 'material-ui/Progress'

const styles = theme => ({
  paper: {
    width: 200,
    height: 250,
    padding: theme.spacing.unit * 2,
    textAlign: 'center'
  },
  img: {
    width: 128,
    height: 163
  }
})

class Book extends Component {
  render() {
    
    const { book, moveBook } = this.props
    const { classes } = this.props
    
    return (
      <Paper key={book.id} className={classes.paper}>
        <Img
          src={book.imageLinks.smallThumbnail}
          alt={book.name}
          className={classes.img}
          loader={<CircularProgress color="accent"/>}
        />
        <Typography noWrap type="body2" title={book.title}>{book.title}</Typography>
        <Typography gutterBottom type="caption">{book.authors && book.authors.toString()}</Typography>
        <BookControl
          book={book}
          moveBook={moveBook}
        />
      </Paper>
    )
  }
  
}

export default withStyles(styles)(Book)