import React from 'react';
import { Route, Link } from 'react-router-dom'
import Books from './Books'
import Search from "./Search";
import { getAll, get, update } from "./BooksAPI";
import './App.css'

class BooksApp extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            books: []
        }
    }

    componentDidMount(){
        this.setBooks();
    }

    setBooks = () => {
        getAll().then((books) => this.setState({ books }));
    };

    updateBooks = (book) => {
        update(book, book.shelf).then((res) => {
            this.setBooks();
        });
    };

    setShelf = (id, shelf) => {
        const books = this.state.books.filter(book => book.id !== id);
        get(id).then((book) => {
            book.shelf = shelf;
            books.push(book);
            this.updateBooks(book, books);
        });
    };

    shelf = (title, books) => {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <li key={book.id}>
                                <Books
                                    id={book.id}
                                    cover={book.imageLinks}
                                    shelf={book.shelf}
                                    title={book.title}
                                    authors={book.authors}
                                    onChangeShelf={this.setShelf}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    };

  render() {

      const { books } = this.state;

      return (
          <div className="app">
              <Route exact path='/search' render={() => (
                  <Search />
              )}/>
              <Route exact path='/' render={() => (
                  <div className="list-books">
                      <div className="list-books-title">
                          <h1>MyReads</h1>
                      </div>
                      <div className="list-books-content">
                          {this.shelf("Currently Reading", books.filter((book) => book.shelf.toLowerCase() === "currentlyreading"))}
                          {this.shelf("Want To Read", books.filter((book) => book.shelf.toLowerCase() === "wanttoread"))}
                          {this.shelf("Read", books.filter((book) => book.shelf.toLowerCase() === "read"))}
                      </div>
                      <div className="open-search">
                          <Link to='/search' />
                      </div>
                  </div>
              )}/>
          </div>
      )
  }
}

export default BooksApp
