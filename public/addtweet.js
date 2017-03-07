$(document).ready(function(){
  function addtweet(name,content,id){
    var htmlstring='<div class="tweets"><b><a href="/users/"'+name+'">'+name+
    '</a></b> * <a href="/tweets/'+id+'">link to message</a><li>'+content+'</li><hr></div>';
    return htmlstring;
  }
  $('#tweetdiv').prepend(addtweet('joe schmoe','hello!',100))
});

// function addtweet(name,content,id){
//   var htmlstring='<div class="tweets"><b><a href="/users/"'+name+'">'+name+
//   '</a></b> * <a href="/tweets/'+id+'">link to message</a><li>'+content+'</li><hr></div>';
//   return htmlstring;
// }
