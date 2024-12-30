import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../bookCard/BookCard";
import "./FeaturedBooks.css";

const FeaturedBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getAllBooks")
      
      .then((response) => {
        console.log(response.data.data);
        setBooks(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Featured Books</h1>
      <div className="featured-book-container">
        {books.map((book) => (
          <BookCard
            imageUrl={book.imageUrl}
            key={book._id}
            title={book.title}
            author={book.author}
            price={book.price}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedBooks;
