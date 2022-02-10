"use strict";

// fetch("https://ajar-energetic-louse.glitch.me/movies")
// .then(res => res.json())
// .then(resObj => console.log(resObj))

// alert("Loading....");
let movies = $("#movies");
fetch("https://ajar-energetic-louse.glitch.me/movies")
    .then(res => res.json())
    .then(resObj => {
        console.log(resObj)
        resObj.forEach(element =>  {
            movies.append(`
                <div class="">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h2 class="card-title">${element.title} - (${element.year})</h2>
                        <h4 class="card-text">Rating: ${element.rating} Stars</h4>
                        <h5>Director: ${element.director}</h5>
                        <p class="card-text">${element.plot}</p>
                    </div>
                </div>       
                </div>        
            `)
        })}
    );

