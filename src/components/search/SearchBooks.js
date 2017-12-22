import React from 'react'
import { Link } from 'react-router-dom'
import { DebounceInput } from 'react-debounce-input'
import * as BooksAPI from '../../utils/BooksAPI'
import Book from "../book/Book"

class SearchBooks extends React.Component {
  
  state = {
    query: '',
    books: []
  }
  
  doSearch() {
    BooksAPI.search(this.state.query).then(books => {
      if(!books.error) {
        this.setState({
          books: books.map(book => {
            const myBook = this.props.myBooks.filter(myBook => myBook.id === book.id)
            if(myBook[0]) {
              book.shelf = myBook[0].shelf
            }
            return book
          })
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
    this.setState({query}, () => {
      if(query) {
        this.doSearch()
      } else {
        this.clearBooks()
      }
    })
  }
  
  render() {
    
    const {query, books} = this.state
    const {moveBook} = this.props
    
    /*if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = books.filter((book) => match.test(book.title))
    }*/
    
    return (
      <div>
        <h4>Here shall be thy search of books</h4>
        <Link to="/">Back</Link>
        <DebounceInput
          type="text"
          placeholder="Search by title or author"
          value={query}
          minLength={3}
          debounceTimeout={500}
          onChange={(event) => {
            this.updateQuery(event.target.value)
          }}
        />
        {books.map(book => (
          <Book
            key={book.id}
            book={book}
            moveBook={moveBook}
            updateLibrary={this.props.updateLibrary}
          />
        ))}
        
      </div>
    )
  }
}

export default SearchBooks
