"use strict";

// fetch("https://ajar-energetic-louse.glitch.me/movies")
// .then(res => res.json())
// .then(resObj => console.log(resObj))

// alert("Loading....");
let body = $("body");
fetch("https://ajar-energetic-louse.glitch.me/movies")
    .then(res => res.json())
    .then(resObj => {
        console.log(resObj)
        resObj.forEach(element =>  {
            body.append(`
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h2 class="card-title">${element.title} - (${element.year})</h2>
                        <h4>Director: ${element.director}</h4>
                        <p class="card-text">${element.plot}</p>
                    </div>
                </div>               
`)


        })
        }
    )

