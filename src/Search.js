import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Debounce } from 'react-throttle';
import PropTypes from "prop-types";
import { search } from './BooksAPI';
import Books from './Books';

class Search extends Component {

    static propTypes = {
        getShelf : PropTypes.func.isRequired,
        onChangeShelf : PropTypes.func.isRequired
    };

    constructor(props){
        super(props);
        this.state = {
            books: [],
            isLoading: false
        };
    }

    setBooks = (books) => {
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
            this.startLoader();
            search(query, 10)
                .then(books => {
                    if(!books || books.error){
                        this.clearBooks();
                        return false;
                    }
                    this.setBooks(books);
                    this.stopLoader();
                }).catch(() => this.clearBooks());
        }else{
            this.clearBooks();
            this.stopLoader();
        }
    };

    startLoader = () => {
        this.setState({ isLoading: true});
    };

    stopLoader = () => {
        this.setState({ isLoading: false});
    };

    static loader(){
        return(
            <div>
                <div className="backdrop" />
                <div className="loader" />
            </div>
        )
    };

    static headerBar(handleQuery) {
        return(
            <div className="search-books-bar">
                <Link className="close-search" to="/" />
                <div className="search-books-input-wrapper">
                    <Debounce time="400" handler="onChange">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(e) => handleQuery(e.target.value)}
                        />
                    </Debounce>
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
                                shelf={getShelf(book.id)}
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

        const { books, isLoading } = this.state;
        const { getShelf, onChangeShelf } = this.props;

        return(
            <div>
                {isLoading && (
                    Search.loader()
                )}
                <div className="search-books">
                    {Search.headerBar(this.updateQuery)}
                    {Search.searchBooks(books, getShelf, onChangeShelf)}
                </div>
            </div>
        )
    }
}

export default Search