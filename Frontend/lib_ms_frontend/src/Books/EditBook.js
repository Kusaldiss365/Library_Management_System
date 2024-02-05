import axios from "axios";
import React,{ useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";


export default function AddBook(){
    
    let navigate = useNavigate();

    const{id} = useParams();

    const loadBook=async()=>{
        const result = await axios.get(`http://localhost:8081/books/${id}`)
        setBook(result.data);
    }

    useEffect(()=>{
        loadBook();
    },[])

    const [book, setBook] = useState({
        title:"",
        author:"",
        pub_year:"",
        description:""
    });

    const{title,author,pub_year,description}=book;

    const [authorError, setAuthorError] = useState("");
    const [pubYearError, setPubYearError] = useState("");

    const onInputChange=(e)=>{
        setBook({...book,[e.target.name]:e.target.value})
    }

    const onSubmit = async(e)=>{
        e.preventDefault();

        setAuthorError("");
        setPubYearError("");
        
        if (title.trim() === "" || author.trim() === "" || pub_year.toString().trim() === "" || description.trim() === "") {
            alert("Please fill all fields.");
            return;
        }

        const authorPattern = /^[a-zA-Z\s]+$/;
        if (!authorPattern.test(author)) {
            setAuthorError("Please enter a valid author name containing only letters!");
            return;
        }

        const currentYear = new Date().getFullYear();
        const enteredYear = parseInt(pub_year, 10);
    
        if (isNaN(enteredYear) || enteredYear <= 0 || enteredYear > currentYear) {
            setPubYearError("Please enter a valid year!.");
            return;
        }
        
        const yearPattern = /^[0-9]+$/;
        if (!yearPattern.test(pub_year)) {
            setPubYearError("Please enter a valid year containing only numbers!");
            return;
        }

        try {
            console.log("Making axios request...");
            await axios.put(`http://localhost:8081/books/${id}`, book);
            console.log("Request successful!");
            navigate("/");
        } catch (error) {
            console.error("Error during axios request:", error);
        }
    }

    return(
        <div className="contianer">
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-4 shadow'>
        <h2 className='text-center m-4'><FaRegEdit size="1.5em"/> Edit Book</h2>

        <form onSubmit={(e)=> onSubmit(e)}>
        <div className="mb-3">
        <label htmlFor='title' className='form-label'> Title </label>
        <input
        type={'text'}
        className="form-control"
        placeholder={book.title}
        name="title"
        value={title}
        onChange={(e)=>onInputChange(e)} 
        />
        </div>

        <div className="mb-3">
        <label htmlFor='author' className='form-label'> Author </label>
        <input
        type={'text'}
        className="form-control"
        placeholder={book.author}
        name="author"
        value={author}
        onChange={(e)=>onInputChange(e)} 
        />
        {authorError && <small className="text-danger">{authorError}</small>}
        </div>

        <div className="mb-3">
        <label htmlFor='pub_year' className='form-label'> Published Year </label>
        <input
        type={'text'}
        className="form-control"
        placeholder={book.pub_year}
        name="pub_year"
        value={pub_year}
        onChange={(e)=>onInputChange(e)} 
        />
        {pubYearError && <small className="text-danger">{pubYearError}</small>}
        </div>

        <div className="mb-3">
        <label htmlFor='description' className='form-label'> Description </label>
        <input
        type={'text'}
        className="form-control"
        placeholder={book.description}
        name="description"
        value={description}
        onChange={(e)=>onInputChange(e)} 
        />
        </div>
        
        <button type="submit" className='btn btn-outline-primary'>Submit</button>
        <Link className='btn btn-outline-danger mx-2' to="/" >Cancel</Link>

        </form>
        </div>
    </div>
    )
}