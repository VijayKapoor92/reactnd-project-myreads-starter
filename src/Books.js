import React from 'react';
import PropTypes from 'prop-types'

const validate_img = (image) => {
    const no_image_path = "http://via.placeholder.com/128x193?text=No%20Cover";
    return image ? image : no_image_path;
};

const BooksChanger = ({shelf, onChange}) =>
    <div className="book-shelf-changer">
        <select value={shelf} onChange={(event) => onChange(event.target.value)}>
            <option value="moveTo" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
        </select>
    </div>;

const Books = ({id, cover={}, shelf, title, authors=[], onChangeShelf}) => {
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{width: 128, height: 192, backgroundImage: `url(${validate_img(cover.thumbnail)})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"}}/>;
                <BooksChanger shelf={shelf} onChange={(shelf) => onChangeShelf(id, shelf)} />
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">
                <ol className="authors-list">
                    {authors.map((author, index) => (
                        <li key={index}>{author}</li>
                    ))}
                </ol>
            </div>
        </div>
    )
};

Books.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    cover: PropTypes.object,
    authors: PropTypes.array,
    shelf: PropTypes.string,
    onChangeShelf: PropTypes.func.isRequired
};

export default Books;
