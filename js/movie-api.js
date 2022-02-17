"use strict";

$(document).ready(function () {

    setTimeout(() => {
        $("#loader").toggleClass('loader');
        $(".container").toggleClass("hide");
        $("#loadingText").toggleClass("hide");
    }, 1000)

    function getData() {
        fetch("https://ajar-energetic-louse.glitch.me/movies")
            .then(res => res.json())
            .then(resObj => {
                resObj.forEach(element => {
                    renderMovies(element.id, element.title, element.year, element.rating, element.director, element.plot);
                })
                return resObj;
            })
        location.reload();
    }

    function renderMovies(id, title, year, rating, director, plot) {
        let movies = $("#movies");
        movies.append(`
                    <div class="col-12 col-md-6 col-lg-4 mb-3">
                        <div class="card">
                            <div class="card-body">
                                <p class="id hide">${id}</p>
                                <h3 class="card-title limeLight">${title} - (${year})</h3>
                                <h5 class="card-text">Rating: ${rating}/10 Stars</h5>
                                <h5>Director: ${director}</h5>
                                
                                <p class="overflow-auto h-50 ">${plot}</p>                                
                            </div>
                            <div class="p-3 ">
                            <button type="button" class=" btn btn-success edit w-100"  data-value="${id}" data-toggle="modal" data-target="#editForm">Edit</button>
                            <button type="button" class="col-12 btn btn-danger delete w-100 mt-2"  data-value="${id}">Delete</button>
                            </div>                  
                        </div>       
                    </div>`
        )
    }

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
                let ID = $(this).attr("data-value");
                let modal = `<div class="modal fade" id="editForm" tabindex="-1" role="dialog" aria-labelledby="editFormLabel" aria-hidden="true">
                    <div class="modal-dialog-centered modal-dialog" role="dialog">
                        <div class="modal-content p-4">
                            <form>
                            <button type="button" class="close text-light float-right" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
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
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button id="editSubmit" class="btn btn-primary float-right" data-value="${ID}">Submit</button>                                
                            </form>
                        </div>
                    </div>
                </div>`;
                $('#modalForm').append(modal);
                $("#editSubmit").click(function (e) {
                    e.preventDefault()
                    $("#editSubmit").attr('data-dismiss', 'modal');
                    fetch(`https://ajar-energetic-louse.glitch.me/movies/${ID}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            id: ID,
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

            $("#Submit").click(function (event) {
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

            $(".delete").click(function (e) {
                e.preventDefault();
                console.log($(this).attr("data-value"));
                let id = $(this).attr("data-value")
                fetch(`https://ajar-energetic-louse.glitch.me/movies/${id}`, {
                    method: 'DELETE'
                })
                    .then(() => {
                        location.reload();
                    })
            })
        });


    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });
    // scroll body to 0px on click
    $('#back-to-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 400);
        return false;
    });

});