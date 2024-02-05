import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { MdLocalLibrary } from "react-icons/md";


export default function Home(){

    const[books, setBooks] = useState([]);
    const[search, setSearch] = useState([]);

    useEffect(() => {
        loadBook();
    },[])

    const searchBook = (event)=>{
        setSearch(books.filter(f => f.title.toLowerCase().includes(event.target.value)))
    }

    const loadBook=async()=>{
        const result = await axios.get("http://localhost:8081/books")
        setBooks(result.data);
        setSearch(result.data);
    }

    return(
        <div className="container mt-4">
        <h2 className="mb-5"><MdLocalLibrary size="2.5rem"/> <b>Library Management System</b></h2>
        <input className="form-control me-2 d-flex" type="text" placeholder="Search for a book here" aria-label="Search" onChange={searchBook}/>
        <div className="py-4 mx-auto">
        <table className="table table-hover">
            <thead>
                <tr>
                <th></th>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Publication Year</th>
                <th scope='col'></th>
                </tr>
            </thead>
            <tbody>
            { books && search.map((book,index)=>(
            <tr key={index}>
                <th scope="row" key={index}> {index+1} </th>
                <td> {book.title}</td>
                <td> {book.author} </td>
                <td> {book.pub_year} </td>
                <td>
                    <Link className="btn btn-success mx-1" to={`/viewbook/${book.id}`}>Details</Link>
                    <Link className="btn btn-primary mx-1" to={`/editbook/${book.id}`}>Edit</Link>
                </td>
            </tr>
            ))
            }
            </tbody>
        </table>
        </div>
        </div>
    )
}