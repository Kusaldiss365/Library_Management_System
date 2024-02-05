
export default function Validation(book){

    const thisYear = new Date().getFullYear();
    const errors = {}

    const words = /^[a-zA-Z]+$/;
    
    if(book.title == ""){
        errors.title = "Title is required!";
    }

    if(book.author  == ""){
        errors.author = "Author is required!";
    }else if(!words.test(book.author)){
        errors.author = "The name of the author can only have letters!"
    }

    if(book.pub_year == ""){
        errors.pub_year = "Year is required!";
    }else if(0 >= book.pub_year){
        errors.pub_year  = "This year is not valid!";
    }else if(book.pub_year > thisYear){
        errors.pub_year  = "This year is not valid!";
    }

    if(book.description == ""){
        errors.description = "Description is required!";
    }

    return errors;
}