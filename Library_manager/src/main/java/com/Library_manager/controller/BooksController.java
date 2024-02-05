package com.Library_manager.controller;

import com.Library_manager.exceptions.BookNotFound;
import com.Library_manager.exceptions.BookNotFoundException;
import com.Library_manager.model.Books;
import com.Library_manager.repository.BooksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class BooksController {

    @Autowired
    private BooksRepository booksRepository;

    @GetMapping("/books")
    List<Books> getAllBooks() {
        return booksRepository.findAll();
    }

    @GetMapping("/books/{id}")
    Books getBookById(@PathVariable Long id){
        return booksRepository.findById(id).orElseThrow(() -> new BookNotFoundException(id));
    }

    @PostMapping("/books")
    Books newBook(@RequestBody Books newBook){
        return booksRepository.save(newBook);
    }

    @PutMapping("books/{id}")
    Books getBookById(@RequestBody Books newBook, @PathVariable Long id){
        return booksRepository.findById(id)
                .map(book -> {
                    book.setTitle(newBook.getTitle());
                    book.setAuthor(newBook.getAuthor());
                    book.setPub_year(newBook.getPub_year());
                    book.setDescription(newBook.getDescription());
                    return booksRepository.save(book);
                }).orElseThrow(() -> new BookNotFound(id));
    }

    @DeleteMapping("books/{id}")
    String deleteBook(@PathVariable Long id){
        if(!booksRepository.existsById(id)){
            throw new BookNotFound(id);
        }
        booksRepository.deleteById(id);
        return "Book with ID "+id+" has been succcessfully deleted";
    }

}
