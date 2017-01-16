    $('#myModal').on('load', function() {
        // if (!data) return e.preventDefault()  stops modal from being shown
    });

    $(document).ready(function() {
        var searchVal;
        var nameVal;
        var res;
        var des;
        var baseAjax;
        var baseURL;
        var nameAjax;
        var choice;
        var curActor;
        var idArray = [];
        $('#search').on('click', function() {
            searchVal = $('#name').val().trim();
             baseURL = 'http://imdb.wemakesites.net/api/search?q='  + searchVal + '&api_key=cfa2962b-0e94-49f0-a266-76045337173c'
  
            console.log(baseURL)
            baseAjax = $.ajax({

                url: baseURL,
                method: 'GET',
                dataType: 'jsonp',

            }).done(function(responseA) {
                res = responseA.data.results.names;
console.log(res)
            
                for (let i = 0; i < res.length; i++) {                   
                    curActor = ({
                        title: res[i].title,
                        id: res[i].id,
                        thumbnail: res[i].thumbnail,
                        nameURL : 'http://imdb.wemakesites.net/api/' + res[i].id + '?api_key=cfa2962b-0e94-49f0-a266-76045337173c'
                    });
                    idArray.push(curActor);
         
                    var strh = $('#actors').append('<tr><td class = "actor">' + res[i].title + '</td><td class = "id">' + res[i].id + '</td><td><img src ="' + res[i].thumbnail  + '" alt = "thumbnail"></td></div></tr>')
                    /*$('.id').hide();*/
                }
                console.log(idArray)
                console.log(strh)
                });
            });
                $('td.actor').on('click', function() {

                  /*$('#films').empty()*/
                   console.log('nameURL')
                    nameAjax = $.ajax({
                        url: nameURL,
                        method: 'GET',
                        dataType: 'jsonp'
                    }).done(function(response) {
                        /*console.log(response)*/
                            /*   des = response.data.description;*/
                            /*   console.log(response.data.description)*/
                        films = response.data.filmography;
                        console.log(films)
                        $('#description').append(des)
                        for (let i = 0; i < films.length; i++) {
                            $('#films').append('<tr><td><a href = "' + films[i].info + '">' + films[i].title + '<td>' + films[i].year + '<td><tr>');

                        }
                    });
                });
            
        
    });
