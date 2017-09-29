var query;
var startDate;
var endDate;
var page;

function nytimesSearch(){
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=d85061fa785342b0a38b94de8b922673&q=" + query + "&page=" + page;
    if (startDate != '') {
      url = url + "&begin_date=" + startDate;
    }
    if (endDate != '') {
      url = url + "&end_date=" + endDate;
    }
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(result) {
      console.log(result);

      for (var i = 0; i < parseInt(page); i++){
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
        }//end for loop
    });//ajax done
};//nytimesSearch function end

  $("#search-btn").on("click", function(){
    event.preventDefault();
    $("#results").empty();
      // console.log("searchclick") 
     query = $("#search-term").val();
     page = $("#num-results").val();
     startDate = $("#start-year").val();
     endDate = $("#end-year").val();
      nytimesSearch();
    });