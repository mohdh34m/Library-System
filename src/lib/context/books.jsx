import { createContext, useContext, useEffect, useState } from "react";
import { databases } from "../appwrite";
import { ID, Query } from "appwrite";

export const BOOKS_DATABASE_ID = import.meta.env.VITE_BOOKS_DATABASE_ID; // Replace with your database ID
export const BOOKS_COLLECTION_ID = import.meta.env.VITE_BOOKS_COLLECTION_ID; // Replace with your collection ID


const BooksContext = createContext();

export function useBooks() {
  return useContext(BooksContext);
}

export function BooksProvider(props) {
  const [books, setBooks] = useState([]);

  async function add(book) {
    try {
      const response = await databases.createDocument(
        BOOKS_DATABASE_ID,
        BOOKS_COLLECTION_ID,
        ID.unique(),
        book
      );
      setBooks((books) => [response, ...books].slice(0, 10));
    } catch (err) {
      console.log(err) // handle error or show user a message
    }
  }

  async function remove(id) {
    try {
      await databases.deleteDocument(BOOKS_DATABASE_ID, BOOKS_COLLECTION_ID, id);
      setBooks((books) => books.filter((book) => book.$id !== id));
      await init();
    } catch (err) {
      console.log(err)
    }
  }

  async function filterBooks(value) {
    try {
      const response = await databases.listDocuments(
        BOOKS_DATABASE_ID,
        BOOKS_COLLECTION_ID,
        [Query.orderDesc("$createdAt"), Query.limit(10)]
      );
      const filteredBooks = response.documents.filter((book) =>
        book.title.toLowerCase().includes(value.toLowerCase()) ||
        book.author.toLowerCase().includes(value.toLowerCase())
      );
      setBooks(filteredBooks);
    } catch (err) {
      console.error("Error filtering books:", err);
    }
  }

  
  

  async function init() {
    try {
      const response = await databases.listDocuments(
        BOOKS_DATABASE_ID,
        BOOKS_COLLECTION_ID,
        [Query.orderDesc("$createdAt"), Query.limit(10)]
      );
      setBooks(response.documents);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <BooksContext.Provider value={{ current: books, add, remove, filterBooks }}>
      {props.children}
    </BooksContext.Provider>
  );
}
