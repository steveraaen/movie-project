
$(document).ready(function(){
 var nameVal = $('#name').val().trim(
$('#search').on('sumbit', function() {
  console.log('data')
  preventDefault();
  $.ajax({
    url: 'http://imdb.wemakesites.net/api/' + nameVal,
    crossDomain: true,
    api_key: 'cfa2962b-0e94-49f0-a266-76045337173c',
    dataType: 'jsonp'
  }).done(function(response) {
    console.log(nameVal)
  });
});
})