"use strict";

// fetch("https://ajar-energetic-louse.glitch.me/movies")
// .then(res => res.json())
// .then(resObj => console.log(resObj))

// alert("Loading....");
let movies = $("#movies");
let request = fetch("https://ajar-energetic-louse.glitch.me/movies")
    .then(res => res.json())
    .then(resObj => {
            console.log(resObj)
            resObj.forEach(element => {
                movies.append(`
                <div class="col-4 mb-3">
                <div class="card style="width: 18rem;">
                    <div class="card-body">
                        <h2 class="card-title">${element.title} - (${element.year})</h2>
                        <h4 class="card-text">Rating: ${element.rating} Stars</h4>
                        <h5>Director: ${element.director}</h5>
                        <p class="card-text">${element.plot}</p>
                    </div>
                </div>       
                </div>        
            `)
            })
        }
    );

function addMovie (movieForm){
    let url = "https://ajar-energetic-louse.glitch.me/movies";
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(movieForm),
    };
    fetch(url,options)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    return movieForm;
}

$("#submit").click(function (event){
    event.preventDefault();
    let movieForm = {
        title: $("#title").val(),
        rating: $("#rating").val(),
        year: $("#year").val(),
        director:$("#director").val(),
        plot: $("#plot").val()
    }
    addMovie(movieForm);
});

