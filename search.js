// we need a form to search for keywords that will return responses from NYT's API
// each result from a field will be shown below the form.
// var query = $("#queryInput").val("trump");
// var page = $("#pageInput").val();
// var startDate = $("#startDateInput").val();
// var endDate = $("#endDateInput").val();

var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
url += '?' + $.param({
  'api-key': "d85061fa785342b0a38b94de8b922673",
  'q': "trump",
  'begin_date': "20160404",
  'end_date': "20170404",
  'page': 10
});
$.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
  console.log(result);
  for (var i = 0; i < result.response.docs.length; i++){
  var headline = result.response.docs[i].headline.main;
  console.log(headline);
  var articleDiv = $("<div>");
  var headerTitle = $("<h1>").text(headline);

  var byline = result.response.docs[i].byline.original;
  // console.log(byline);
  var bylineP = $("<p>").text(byline);

  var sectionName = result.response.docs[i].section_name;
  // console.log("Section: " + sectionName);
  var sectionP = $("<p>").text("Section: " + sectionName);

  var pubDate = result.response.docs[i].pub_date;
  // console.log(pubDate);
  var dateP = $("<p>").text(pubDate);

  var webUrl = result.response.docs[i].web_url;
  // console.log("<a href = '"+ webUrl + "'>"+ webUrl + "</a>");
  var linkP = $("<p><a href = '"+ webUrl + "'>"+ webUrl + "</a></p>");

  articleDiv.append(headerTitle, bylineP, sectionP, dateP, linkP)
  $("#results").append(articleDiv);
  }

  $("#search").on("click", function(){


    })

 
}).fail(function(err) {
  throw err;
});