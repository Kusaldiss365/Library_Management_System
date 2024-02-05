package com.Library_manager.exceptions;

public class BookNotFound extends RuntimeException{
    public BookNotFound(Long id){
        super("Could not find the book with the id "+ id);
    }
}
