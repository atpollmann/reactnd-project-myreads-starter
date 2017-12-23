# MyReads Project

A book tracking App.
Udacity React nanodegree first project.

## Installation
- Clone the repo
- Run `npm install`
- Run `npm start` to start the dev server
- Go to `localhost:3000` on the local machine

## Features
### Main page
- The main page shows 3 shelves for books: Currently Reading, What to Read and Read.
- The main page shows a control that allows users to move books between shelves. The control is tied to each book instance.
- When the browser is refreshed, the same information is displayed on the page.
 
### Search page
- The search page has a search input field. As the user types into the search field, books that match the query are displayed on the page.
- Search results on the search page allow the user to select “currently reading”, “want to read”, or “read” to place the book in a certain shelf.
- When an item is categorized on the search page, and the user navigates to the main page, it appears on that shelf in the main page.

### Routing
- The main page contains a link to the search page. When the link is clicked, the search page is displayed and the URL in the browser’s address bar is `/search`.
- The search page contains a link to the main page. When the link is clicked, the main page is displayed and the URL in the browser’s address bar is `/`.

### Code functionality
- Component state is passed down from parent components to child components. The state variable is not modified directly. Instead, the `setState()` function is used for that purpose.
- Books have the same state on both the search page and the main application page: If a book is on a bookshelf, that is reflected in both locations.
- All JSX code is formatted properly and functional.

## Above and beyond
- The application uses [Material-UI](https://material-ui-next.com/) latest beta release React components.
- The application uses [React Image](https://www.npmjs.com/package/react-image) component to render missing images.