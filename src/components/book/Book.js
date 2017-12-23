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
    height: 163,
    border: "1px solid #ddd"
  }
})

/**
 * Displays a single book
 * If the book cover thumbnail image is
 * not present in the server response,
 * shows a default image (using the
 * react-image component
 * @Component
 */
class Book extends Component {
  
  render() {
    
    const { book } = this.props
    const { classes } = this.props
    const authors = (book.authors && book.authors.reduce(
      (acc, val) => (acc + ', ' + val))
    ) || '(Authors missing)'
    
    
    return (
      <Paper key={book.id} className={classes.paper}>
        <Img
          src={[
            (book.imageLinks && book.imageLinks.smallThumbnail),
            'cover_placeholder.png'
          ]}
          alt={book.name}
          className={classes.img}
          loader={<CircularProgress color="accent"/>}
        />
        <Typography noWrap type="body2" title={book.title}>{book.title}</Typography>
        <Typography noWrap gutterBottom title={authors} type="caption">{authors}</Typography>
        <BookControl
          book={book}
          updateLibrary={this.props.updateLibrary}
        />
      </Paper>
    )
  }
}

export default withStyles(styles)(Book)