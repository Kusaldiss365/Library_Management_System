package com.Library_manager.exceptions;

public class BookNotFoundException extends RuntimeException {
    public BookNotFoundException(Long id) {
        super("Couldn't find the book with the ID: " + id);
    }
}
