import React from 'react';
import './SearchBox.css';
import SearchIcon from '@material-ui/icons/Search';
function SearchBox() {



    function searchShow(query){
        const API = "44d9af33";
        fetch(`http://www.omdbapi.com/?s=${query}&apikey=${API}`)
        .then(response =>  response.json())
        .then((jsonData) =>{      
          console.log(jsonData);
          renderResults(jsonData);
         
         
        })
        .catch(err => {
          console.error(err);
        });
      }
     let searchTimeoutToken = 0;
    

      window.onload = () =>{
          const searchFieldElement = document.getElementById("name");
          searchFieldElement.onkeyup = (event) =>{
              clearTimeout(searchTimeoutToken);
         
              searchTimeoutToken = setTimeout(() => {
                searchShow(searchFieldElement.value);
              },500);
          }
      }

      function renderResults(score){
        const uldoc = document.getElementById("movie");
        uldoc.innerHTML = "";
        for(let i =0;i<9;i++)
        {
          const list = document.createElement("li");
          const pic = document.createElement("img");
          const name = document.createElement("p"); 
          pic.src=`${score.Search[i].Poster}`;
          name.innerText = score.Search[i].Title;
          list.appendChild(pic);
          list.appendChild(name);
          list.classList.add("movie-item");
          uldoc.appendChild(list);
        }
      
       
      
       
      }
    




    return (
        <div className="searchBox">
           <form className="InputForm" >
            <div className="Input2">
                <label for="name" class="search"></label>
                <input type = "text" placeholder="Search" id="name"/>
                <button><SearchIcon/></button>
            </div>      
        </form>

        <div className="OutputBox" >
            <ul id="movie" className="Shows"></ul>

        </div>
        </div>
       
    )
}

export default SearchBox
