import React from 'react';
import './SearchBox.css';
import SearchIcon from '@material-ui/icons/Search';
function SearchBox() {



    function searchShow(query){
        fetch(`http://api.tvmaze.com/search/shows?q=${query}`)
        .then(response =>  response.json())
        .then((jsonData) =>{
          const results = jsonData.map(element =>element.show.name);
         renderResults(results);
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
              },250);
          }
      }
  
      function renderResults(score){
        const uldoc = document.getElementById("movie");
        uldoc.innerHTML = "";
          score.forEach(result =>{
            const list = document.createElement("li");
            list.innerText = result;
            uldoc.appendChild(list);
            console.log(result);
    
          })
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
