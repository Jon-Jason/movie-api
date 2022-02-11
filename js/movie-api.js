"use strict";

$(document).ready(function () {


// alert("Loading....");
    let movies = $("#movies");
    fetch("https://ajar-energetic-louse.glitch.me/movies")
        .then(res => res.json())
        .then(resObj => {
            //
            console.log(resObj)
            resObj.forEach(element => {
                movies.append(`
                    <div class="col-4 mb-3">
                        <div class="card style="width: 18rem;">
                            <div class="card-body"">
                                <p class="id hide">${element.id}</p>
                                <h2 class="card-title">${element.title} - (${element.year})</h2>
                                <h4 class="card-text">Rating: ${element.rating} Stars</h4>
                                <h5>Director: ${element.director}</h5>
                                <p class="card-text">plot: ${element.plot}</p>
                                <button type="button" class="btn btn-success" id="edit" data-value="${element.id}"  data-target="#editForm">Edit</button>
                                <button>Delete</button>
                            </div>
                        </div>       
                    </div>`
                )
            })


        })

        .then(editObj => {

            $("#edit").click(function (e) {
                e.preventDefault();
                console.log($(this).attr("data-value"));
                let id = $(this).attr("data-value");

                editObj.append(`
                <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="editForm" aria-hidden="true" id="editForm">
                    <div class="modal-dialog-centered modal-dialog" role="document">
                        <div class="modal-content p-4">
                            <form>
                                <h1 class="text-center">Edit a movie</h1>
                                <div class="form-group mb-3">
                                    <label for="editTitle">Title</label>
                                    <input type="text" class="form-control" id="editTitle" aria-describedby="emailHelp">
                                </div>
                                <div class="form-group mb-3">
                                    <label for="editRating">Rating</label>
                                    <input type="text" class="form-control" id="editRating">
                                </div>
                                <div class="form-group mb-3">
                                    <label for="editYear">Year</label>
                                    <input type="text" class="form-control" id="editYear">
                                </div>
                                <div class="form-group mb-3">
                                    <label for="editDirector">Director</label>
                                    <input type="text" class="form-control" id="editDirector">
                                </div>
                                <div class="form-group mb-3">
                                    <label for="editPlot">Plot</label>
                                    <textarea class="form-control" id="editPlot"></textarea>
                                </div>
                                <button id ="editSubmit" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>`)

                    // $(".container").append(editForm);


                    $("#editSubmit").click(function (e) {
                        e.preventDefault()
                        let id = $(this).attr("data-value");
                        console.log(id);
                        fetch(`https://ajar-energetic-louse.glitch.me/movies/${element.id}`, {
                            method: 'PUT',
                            body: JSON.stringify({
                                id: element.id,
                                title: $("#editTitle").val(),
                                rating: $("#editRating").val(),
                                year: $("#editYear").val(),
                                director: $("#editDirector").val(),
                                plot: $("#editPlot").val(),

                            }),
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8',
                            },
                        })
                            .then((response) => response.json())
                            .then((json) => console.log(json));
                    })
                })
            }
        )


    function addMovie(movieForm) {
        let url = "https://ajar-energetic-louse.glitch.me/movies";
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movieForm),
        };
        fetch(url, options)
            .then(res => console.log(res))
            .catch(error => console.log(error))
        return movieForm;
    }

    $("#submit").click(function (event) {
        event.preventDefault();
        let movieForm = {
            title: $("#title").val(),
            rating: $("#rating").val(),
            year: $("#year").val(),
            director: $("#director").val(),
            plot: $("#plot").val()
        }
        addMovie(movieForm);
    });

});