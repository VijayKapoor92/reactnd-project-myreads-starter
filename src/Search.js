import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

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

    render(){

        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/" />
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search