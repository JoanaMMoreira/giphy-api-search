var apikey = '7uWoBjLiRDF91y2V619EZ6gSE0cNUGiP';

$(document).ready(function () {

  function encodeQueryData(data) {
    var ret = [];
    for (var d in data)
      ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
  }

  function httpGetAsync(theUrl, callback) {
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

      var gif1 = gifs.data[0].images.fixed_width.url;
      $(".pos-1").html("<a href='" + gifs.data[0].embed_url + "'><img src='" + gif1 + "' alt='gif'></a>");

      var gif2 = gifs.data[1].images.fixed_width.url;
      $(".pos-2").html("<a href='" + gifs.data[1].embed_url + "'><img src='" + gif2 + "' alt='gif'></a>");

      var gif3 = gifs.data[2].images.fixed_width.url;
      $(".pos-3").html("<a href='" + gifs.data[2].embed_url + "'><img src='" + gif3 + "' alt='gif'></a>");

      var gif4 = gifs.data[3].images.fixed_width.url;
      $(".pos-4").html("<a href='" + gifs.data[3].embed_url + "'><img src='" + gif4 + "' alt='gif'></a>");

      var gif5 = gifs.data[4].images.fixed_width.url;
      $(".pos-5").html("<a href='" + gifs.data[4].embed_url + "'><img src='" + gif5 + "' alt='gif'></a>");

      var gif6 = gifs.data[5].images.fixed_width.url;
      $(".pos-6").html("<a href='" + gifs.data[5].embed_url + "'><img src='" + gif6 + "' alt='gif'></a>");

      var gif7 = gifs.data[6].images.fixed_width.url;
      $(".pos-7").html("<a href='" + gifs.data[6].embed_url + "'><img src='" + gif7 + "' alt='gif'></a>");

      console.log(gifs.data);
    });
  }
  $("#inputQuery").on('keypress', function (e) {
    if (e.which == 13) {
      var query = $("#inputQuery").val();
      getGif(query);
    }
  });

  $("#submitButton").on("click", function () {
    var query = $("#inputQuery").val();
    getGif(query);
  });
})
