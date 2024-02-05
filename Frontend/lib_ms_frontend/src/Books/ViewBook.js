import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import '../Home/style.css';

export default function ViewBook(){
    
    let navigate = useNavigate();

    const [book,setBook] = useState({
        title:"",
        author:"",
        pub_year:"",
        description:""
    })

    const{id} = useParams();

    useEffect(()=>{
        loadBook();
    })

    const loadBook=async()=>{
        await axios.get(`http://localhost:8081/books/${id}`)
        .then((result)=>{
            setBook(result.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const deleteBook=async (id)=>{
        if(window.confirm("Are you sure you want to Delete this book ?") === true){
            await axios.delete(`http://localhost:8081/books/${id}`)
            .catch((error)=>{
                console.log(error);
            })
            navigate("/");}
    }

    return(
        <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-5 shadow'>
                <h2 className='text-center m-4'>Title: {book.title}</h2>
                <div className='card'>
                    <div className='card_header'>
                    <ul className='list-group'>
                            <li className='list-group-item'>
                                <b>Book ID:  </b>
                                {book.id}
                            </li>
                            <li className='list-group-item'>
                                <b>Author:  </b>
                                {book.author}
                            </li>
                            <li className='list-group-item'>
                                <b>Publication Year:  </b>
                                {book.pub_year}
                            </li>
                            <li className='list-group-item'>
                                <b>Description:  </b>
                                {book.description}
                            </li>
                        </ul>
                    </div>
                </div>
                <button className='btn btn-danger my-2 mx-2 mt-3' onClick={()=>deleteBook(book.id)}>Delete</button>
                <Link className='btn btn-primary my-2  mx-2 mt-3' to="/">Back to Home</Link>
            </div>
        </div>
    </div>
    )
}