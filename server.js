const api_key = "AIzaSyAhByoIctobbiyQPkEQyPgXUYkY7zbdrtY";
const maxResults = 15;
var search_bar = document.querySelector(".search-bar");
var search_input = document.querySelector(".search-input");
var search_btn = document.querySelector(".search-btn");

search_btn.addEventListener("click", function() {
    search_input.focus();

    const xhttp = new XMLHttpRequest();
    if(search_input.value){
        xhttp.open("GET", "https://www.googleapis.com/youtube/v3/search?key=" + api_key + "&type=video&part=snippet&maxResults=" + maxResults + `&q=${search_input.value}`);
        xhttp.send();
        xhttp.onload = function(){
            var data = JSON.parse(xhttp.responseText);
            displayVideos(data); 
        }
    }
    else{
        data.innerHTML="Inavlid Request";
    }
    
    
});
