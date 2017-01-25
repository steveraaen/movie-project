/*to be able to toggle between the two pages*/
function show(shown, hidden) {
    document.getElementById(shown).style.display = 'block';
    document.getElementById(hidden).style.display = 'none';
    return false;
}
$(document).ready(function() {
    // ===========================================================
    // Define variables
    var searchVal;
    var baseURL;
    var actorURL;
    var respA;
    var resp;
    var curChoice;
    var thisVal;
    var currentFilm;
    // ===========================================================

    // Click button to do search on the Initial Page
    $('#submit').on('click', function() {
        InitialSearch();
    });
    //Function to make enter perform the search on the main page
    $("#actor").keypress(function(enter) {
        if (enter.keyCode === 13) {
            console.log('enter clicked');
            $('#Page1').hide();
            $('#Page2').show();
            InitialSearch();
            enter.preventDefault();
        }
    });
    //Search funtion on Page 2 to work on click
    $('#search').on('click', function() {
        $('#actor').val($('#name').val().trim());
        $('#searchContent').empty();
        InitialSearch();
    });
    //Function to make enter perform the search on the 2nd   page
    $("#name").keypress(function(enter) {
        if (enter.keyCode === 13) {
            $('#actor').val($('#name').val().trim());
            $('#searchContent').empty();
            InitialSearch();
            enter.preventDefault();
        }
    });
    //assign input value to searchVal, construct URL and run Ajax
    function InitialSearch() {
        searchVal = $('#actor').val().trim();
        searchVal = searchVal.replace(" ", "_");
        baseURL = 'http://imdb.wemakesites.net/api/search?q=' + searchVal + '&api_key=cfa2962b-0e94-49f0-a266-76045337173c'
        baseAjax = $.ajax({
            url: baseURL,
            method: 'GET',
            dataType: 'jsonp'
        }).done(function(responseA) {
            $('#info').html("");
            // ===========================================================
            // Assign respA as shortcut to results.  Loop throgh response and display name, id & thumbnail
            respA = responseA.data.results.names;
            console.log(respA)
            for (var i = 0; i < respA.length; i++) {
                $('#searchContent').append(' <div class = "well row choices" id =" ' + respA[i].id + '" ><div class = "col-md-4">' + respA[i].title + '</div><div class = "col-md-4"><img src ="' + respA[i].thumbnail + '"><button class= "info" id = "' + respA[i].id + '" data-actorname ="' + respA[i].title + '" data-moreinfoclicked = ' + '"no"' + '"  >Click to See More/Less</button></div></div>')
                console.log(respA)
            }
        });
    }
    // ===========================================================
    // Event handler to assign the id of person clicked to curChoice variable & construct URL for new Ajax
    $(document).on('click', '.info', function() {
            if ((this).dataset.moreinfoclicked === "no") {
                $(this).attr('data-moreinfoclicked', "yes");
                curChoice = (this);
                console.log(curChoice);
                ActorName = curChoice.dataset.actorname;
                console.log(ActorName);
                //console.log(curChoice);
                console.log(curChoice.id);
                thisVal = curChoice.id;
                actorURL = 'http://imdb.wemakesites.net/api/' + thisVal + '?api_key=cfa2962b-0e94-49f0-a266-76045337173c'
                actorAjax = $.ajax({
                    url: actorURL,
                    method: 'GET',
                    dataType: 'jsonp'
                }).done(function(response) {
                    // var id = $(curChoice).attr("id");
                    // ===========================================================
                    // Append description to description, loop through results & list all films
                    var ActorDetailsDiv = $('<div id="ActorDetailsDiv' + thisVal + '"></div>');
                    var ActorDescription = $('<div class="ActorDescriptionDiv">' + "Actor Description:" + '</div>');
                    ActorDescription.append('<div class="ActorDescription">' + response.data.description + '</div>');
                    ActorDetailsDiv.append(ActorDescription);
                    for (let i = 0; i < response.data.filmography.length; i++) {
                        var movieListItem = $('<div class="movieListItem" data-moviename="' + response.data.filmography[i].title + '" data-actorid="' + thisVal + '"></div>');
                        movieListItem.text(response.data.filmography[i].title);
                        ActorDetailsDiv.append(movieListItem);
                        $("#" + thisVal).parent().append(ActorDetailsDiv);
                    }
                    console.log(thisVal);
                    console.log(response);
                    console.log("about to make call");
                })
            } // end if statement for the more info call
            else {
                //toggle the amount of information shown after the initial API Call
                console.log((this).id);
                $('#ActorDetailsDiv' + (this).id).toggle();
            }
        })
        //click function that will load the movies on the screen when a movie from the list is clicked
    $(document).on('click', '.movieListItem', function() {
        $('.video').empty();
        currentFilm = (this).dataset.moviename;
        thisVal = (this).dataset.actorid;
        console.log(currentFilm);
        //$(this).siblings().dataset.moviename.toggle();
        youtubeCall();
    });

    function youtubeCall() {
        function start() {
            console.log("working");
            console.log(thisVal);
            var query = ActorName + " " + currentFilm + " trailer";
            console.log(query);
            // Initializes the client with the API key and the Translate API.
            gapi.client.init({
                'apiKey': 'AIzaSyBbnQh0eDikVNdFFrdUrH4Olq79Ncnx_iM',
                'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
            }).then(function() {
                // Executes an API request, and returns a Promise.
                // the methon name "language-tranlation.list" comes from the API discovery
                var request = gapi.client.youtube.search.list({
                    q: query,
                    part: 'snippet'
                });
                return request;
            }).then(function(response) {
                console.log(response.result.items);
                var videoDiv = $('<div class="videoDiv">');
                response.result.items.forEach(function(item) {
                    var video = $('<span class="video">');
                    video.append('<iframe class="youtubePlayer" width="130" height="auto" src="https://www.youtube.com/embed/' + item.id.videoId + '" frameborder="0" allowfullscreen></iframe>');
                    videoDiv.append(video);
                })
                $('#' + thisVal).parent().append(videoDiv);
            }, function(reason) {
                console.log('Error: ' + reason.result.error.message);
            });
        };
        // Loads the JavaScript client library and invokes start afterwards.
        gapi.load('client', start);
    }
    $('.youtubePlayer').on('onStateChange', function() {

        console.log("hello");
    });
    $(document).on('click', '.videoDiv', function(e) {
        e.preventDefault();
        $('#modal-video').modal();
    });
});