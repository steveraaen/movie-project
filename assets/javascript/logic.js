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
                 searchVal = searchVal.replace(" ", "_");
            console.log(searchVal)
            baseURL = 'http://imdb.wemakesites.net/api/search?q=' + searchVal + '&api_key=cfa2962b-0e94-49f0-a266-76045337173c'
             console.log(baseURL)
             baseAjax = $.ajax({
                url: baseURL,
                method: 'GET',
                dataType: 'jsonp'
            }).done(function(responseA) {
                // ===========================================================
                // Assign respA as shortcut to results.  Loop throgh response and display name, id & thumbnail 
                respA = responseA.data.results.names;
                console.log(respA)
                for (var i = 0; i < respA.length; i++) {
                    $('#searchContent').append(' <div class = "well row choices" id = "' + respA[i].id + '"><div class = "col-md-4">' + respA[i].title + '</div><div class = "col-md-4 actorID">' + respA[i].id + '</div><div class = "col-md-4"><img src ="' + respA[i].thumbnail + '"></div></div>')
                    console.log(respA)
                }
            });
        });
        $('#name').on('keypress', function() {
            searchVal = $('#nam e').val().trim();
                 searchVal = searchVal.replace(" ", "_");
            console.log(searchVal)
            baseURL = 'http://imdb.wemakesites.net/api/search?q=' + searchVal + '&api_key=cfa2962b-0e94-49f0-a266-76045337173c'
             console.log(baseURL)
             baseAjax = $.ajax({
                url: baseURL,
                method: 'GET',
                dataType: 'jsonp'
            }).done(function(responseA) {
                // ===========================================================
                // Assign respA as shortcut to results.  Loop throgh response and display name, id & thumbnail 
                respA = responseA.data.results.names;
                console.log(respA)
                for (var i = 0; i < respA.length; i++) {
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

                youtubeCall();
            })
        })
        
    function youtubeCall() {
       function start() {
        var query = thisVal;
        // Initializes the client with the API key and the Translate API.
        gapi.client.init({
          'apiKey': 'AIzaSyBbnQh0eDikVNdFFrdUrH4Olq79Ncnx_iM',
          'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
        }).then(function() {
          // Executes an API request, and returns a Promise.
          // The method name `language.translations.list` comes from the API discovery.
           var request = gapi.client.youtube.search.list({
            q: query,
            part: 'snippet'
            });
           return request;
        }).then(function(response) {
          console.log(response.result.items);
          response.result.items.forEach(function(item) {
            var video = $('<div class="video">');
            video.append(item.snippet.title);
            video.append(item.snippet.description);
            video.append('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + item.id.videoId  + '" frameborder="0" allowfullscreen></iframe>');
            $('#searchContent').append(video);
          })
        }, function(reason) {
          console.log('Error: ' + reason.result.error.message);
        });
      };
      // Loads the JavaScript client library and invokes `start` afterwards.
      gapi.load('client', start);
      // Loads the JavaScript client library and invokes `start` afterwards.
     };
    })
    // 'http://imdb.wemakesites.net/api/nm0000354?api_key=cfa2962b-0e94-49f0-a266-76045337173c'
