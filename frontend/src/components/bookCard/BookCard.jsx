import React from "react";
import book1 from "../../assets/book1.png";
import "./BookCard.css";

const BookCard = (props) => {
  return (
    <div className="book-card-container">
      <div className="book-image-container">
        <img src={props.imageUrl} alt="book" />
      </div>
      <div className="book-content">
        <h3>Name :{props.title}</h3>
        <h3>Author : {props.author}</h3>
        <h4>Price : {props.price}</h4>
      </div>
    </div>
  );
};

export default BookCard;
