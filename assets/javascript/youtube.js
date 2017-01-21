$(document).ready(function() {


    function start() {
        var query = respA.title;
            // Initializes the client with the API key and the Translate API.
        gapi.client.init({
            'apiKey': 'AIzaSyC6QkRE1VTFEzGoNGULRheRWi1FVlY6AOc',
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
                video.append('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + item.id.videoId + '" frameborder="0" allowfullscreen></iframe>');
                $('#videos').append(video);
            })
        }, function(reason) {
            console.log('Error: ' + reason.result.error.message);
        });
    };
    // Loads the JavaScript client library and invokes `start` afterwards.
    gapi.load('client', start);
})
