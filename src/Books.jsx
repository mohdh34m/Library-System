import React from "react";
import Book from "./BookCard";

const books = [
  {
    id: 1,
    title: "Origin - By Dan Brown",
    genre: "Thriller / Mystery",
    coverColor: "#FF5733",
  },
  {
    id: 2,
    title: "The Alchemist - By Paulo Coelho",
    genre: "Philosophy / Fiction",
    coverColor: "#2E86C1",
  },
];

const Books = () => {
  return (
    <div className="h-[200px] bg-gray-900 flex justify-center">
      {books.map((book) => (
        <Book
          key={book.id}
          title={book.title}
          genre={book.genre}
          coverColor={book.coverColor}
        />
      ))}
    </div>
  );
};

export default Books;





