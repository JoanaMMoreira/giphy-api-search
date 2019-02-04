var apikey = '7uWoBjLiRDF91y2V619EZ6gSE0cNUGiP';

$(document).ready(function () {

  function encodeQueryData(data) {
    var ret = [];
    for (var d in data)
      ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
  }

  function httpsGetAsync(theUrl, callback) {
    var xmlHttps = new XMLHttpRequest();
    xmlHttps.onreadystatechange = function () {
      if (xmlHttps.readyState == 4 && xmlHttps.status == 200)
        callback(xmlHttps.responseText);
    }
    xmlHttps.open("GET", theUrl, true); // true for asynchronous 
    xmlHttps.send(null);
  }

  function getGif(query) {
    console.log(query);
    query = query.replace(' ', '+');
    var params = {
      'api_key': apikey,
      'q': query,
      'limit': 7
    };
    params = encodeQueryData(params);

    httpsGetAsync('https://api.giphy.com/v1/gifs/search?' + params, function (data) {
      var gifs = JSON.parse(data);

      for (i = 0; i < gifs.data.length; i++) {
        var gif = gifs.data[i].images.fixed_width.url;
        var position = $(".pos-" + (i + 1));
        position.html("<a href='" + gifs.data[0].embed_url + "'><img src='" + gif + "' alt='gif'></a>");
      }

      console.log(gifs.data);
      if (gifs.data.length == 0) {
        console.log('No gif was found');
        $('.error-message').show();
      }

    });
  }
  $("#inputQuery").on('keypress', function (e) {
    if (e.which == 13) {
      var query = $("#inputQuery").val();
      getGif(query);
      $('.error-message').hide();
    }
  });

  $("#submitButton").on("click", function () {
    var query = $("#inputQuery").val();
    getGif(query);
    $('.error-message').hide();
  });
})