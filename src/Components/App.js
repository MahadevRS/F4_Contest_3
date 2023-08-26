import React,{useState,useEffect} from "react";
import './App.css';
import Navbar from "./Navbar";
import BookList from "./BookList";
// import BookDetails from "../BookDetails";
import axios from "axios";


const App=()=>{

    const [books,setBooks]= useState([]);
    const [search,setSearch]= useState("");

    //To get the book searched in search tab//it will run when some change in search variable or state
    useEffect(()=>{
        console.log("Search : ",search);
        handlerSearch({search})
    },[search])

    async function handlerSearch(bookName){
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookName}`);

            const searchResult= response.data.items;

            setBooks(searchResult);
        } catch (error) {
            console.log("Error While Fetching Search Results",error);
        }
    }

    //for initial reload i.e will load only once at start
    useEffect(()=>{
        DataFetch();
    },[])

    async function DataFetch(){
        try {
            const resultsHerry= await axios.get("https://www.googleapis.com/books/v1/volumes?q=harry+potter");
            const resultsSharelock= await axios.get("https://www.googleapis.com/books/v1/volumes?q=Sherlock+Holmes");

            const AllData=resultsHerry.data.items.concat(resultsSharelock.data.items);

            console.log(AllData);

            setBooks(()=>AllData)

        } catch (error) {
            console.log("Error In Initial Fetch..",error);
        }
    }

    return(
        <div className="App">
            <Navbar onSearch={setSearch} />
            {
                books.length>0 && 
                <BookList books={books} />
            }
        </div>
    )

}

export default App;