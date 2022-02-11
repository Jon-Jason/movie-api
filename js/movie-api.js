"use strict";

$(document).ready(function () {
    function renderMovies(id, title, year, rating, director, plot) {
        let movies = $("#movies");
        movies.append(`
                    <div class="col-4 mb-3">
                        <div class="card style="width: 18rem;">
                            <div class="card-body"">
                                <p class="id hide">${id}</p>
                                <h2 class="card-title">${title} - (${year})</h2>
                                <h4 class="card-text">Rating: ${rating} Stars</h4>
                                <h5>Director: ${director}</h5>
                                <p class="card-text">plot: ${plot}</p>
                                <button type="button" class="btn btn-success edit" id="edit" data-value="${id}" data-toggle="modal" data-target="#editForm">Edit</button>
                                <button>Delete</button>
                            </div>
                        </div>       
                    </div>`
        )
    }

// alert("Loading....");

    fetch("https://ajar-energetic-louse.glitch.me/movies")
        .then(res => res.json())
        .then(resObj => {
            resObj.forEach(element => {
                renderMovies(element.id, element.title, element.year, element.rating, element.director, element.plot);

            })
            return resObj;

        })

        .then(editObj => {
            $(".edit").click(function (e) {
                e.preventDefault();
                let id = $(this).attr("data-value");
                let modal = `<div class="modal fade" id="editForm" tabindex="-1" role="dialog" aria-labelledby="editFormLabel" aria-hidden="true">
                    <div class="modal-dialog-centered modal-dialog" role="dialog">
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
                                <button id ="editSubmit" class="btn btn-primary" data-value="${id}">Submit</button>
                                <button type="button" class="btn btn-secondary float-right" data-dismiss="modal">Close</button>
                            </form>
                        </div>
                    </div>
                </div>`;
                $('#modalForm').append(modal);
                $("#editSubmit").click(function (e) {
                    e.preventDefault()
                    fetch(`https://ajar-energetic-louse.glitch.me/movies/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            id: id,
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
                        .then(json => {
                            $("#movies > *").remove();
                            getData();
                        })
                })
            })

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
                    .then(res => {
                        $("#movies > *").remove();
                        getData();
                    })
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

            function getData() {
                fetch("https://ajar-energetic-louse.glitch.me/movies")
                    .then(res => res.json())
                    .then(resObj => {
                        resObj.forEach(element => {
                            renderMovies(element.id, element.title, element.year, element.rating, element.director, element.plot);
                        })
                        return resObj;
                    })
            }

        });
});