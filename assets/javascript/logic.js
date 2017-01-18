$(document).ready(function() {
        // ===========================================================
        // Define variables
        var searchVal;
        var baseURL;
        var thisVal;
        var actorURL;
        var respA;
        var resp;
        var curChoice;
        // ===========================================================
        // Click button to assign input value to searchVal, construct URL and run Ajax
        $('#search').on('click', function() {
            searchVal = $('#name').val().trim();
            baseURL = 'http://imdb.wemakesites.net/api/search?q=' + searchVal + '&api_key=cfa2962b-0e94-49f0-a266-76045337173c'
            baseAjax = $.ajax({
                url: baseURL,
                method: 'GET',
                dataType: 'jsonp'
            }).done(function(responseA) {
                // ===========================================================
                // Assign respA as shortcut to results.  Loop throgh response and display name, id & thumbnail 
                respA = responseA.data.results.names;
                console.log(respA)
                for (var i = respA.length - 1; i >= 0; i--) {
                    $('#searchContent').append(' <div class = "well row choices" id = "' + respA[i].id + '"><div class = "col-md-4">' + respA[i].title + '</div><div class = "col-md-4 actorID">' + respA[i].id + '</div><div class = "col-md-4"><img src ="' + respA[i].thumbnail + '"></div></div>')
                    console.log(respA)
                }
            });
        });
        // ===========================================================
        // Event handler to assign the id of person clicked to curChoice variable & construct URL for new Ajax
        $(document).on('click', '.choices', function() {
            curChoice = (this);
            var thisVal = curChoice.id;
            actorURL = 'http://imdb.wemakesites.net/api/' + thisVal + '?api_key=cfa2962b-0e94-49f0-a266-76045337173c'
            actorAjax = $.ajax({
                url: actorURL,
                method: 'GET',
                dataType: 'jsonp'
            }).done(function(response) {
                // ===========================================================
                // Append description to description, loop through results & list all films            
                $('#description').html(response.data.description);
                for (let i = 0; i < response.data.filmography.length; i++) {
                    $('#searchContent').append(response.data.filmography[i].title + '<br>')
                }
                console.log(thisVal)
                console.log(response)
            })
        })
    })
    // 'http://imdb.wemakesites.net/api/nm0000354?api_key=cfa2962b-0e94-49f0-a266-76045337173c'
