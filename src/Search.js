import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { search } from './BooksAPI';

class Search extends Component {

    static propTypes = {
        getShelf : PropTypes.func.isRequired,
        onChangeShelf : PropTypes.func.isRequired
    };

    constructor(props){
        super(props);
        this.state = {
            books: []
        };
        this.setBooks = this.setBooks.bind(this);
    }

    setBooks(books){
        this.setState({ books });
    };

    clearBooks = () => {
        this.setState({
            books: []
        });
    };

    updateQuery = (query) => {
        query = query.trim();
        if(query.length > 0){
            search(query, 20)
                .then(books => {
                    if(!books || books.error){
                        this.clearBooks();
                        return false;
                    }
                    this.setBooks(books);
                }).catch(() => this.clearBooks());
        }else{
            this.clearBooks();
        }
    };

    static headerBar(handleQuery) {
        return(
            <div className="search-books-bar">
                <Link className="close-search" to="/" />
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title or author"
                        onChange={(e) => handleQuery(e.target.value)}
                    />
                </div>
            </div>
        );
    };

    static searchBooks(books, getShelf, onChangeShelf) {
        return (
            <div className="search-books-results">
                <ol className="books-grid">
                    {books.map(book => (
                        <li key={book.id}>
                            <Books
                                id={book.id}
                                cover={book.imageLinks}
                                shelf={book.shelf}
                                title={book.title}
                                authors={book.authors}
                                onChangeShelf={onChangeShelf}
                            />
                        </li>
                    ))}
                </ol>
            </div>
        );
    };

    render(){

        return(
            <div className="search-books">
                {Search.headerBar(this.updateQuery)}
                <div className="search-books-results">
                    <ol className="books-grid">
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search