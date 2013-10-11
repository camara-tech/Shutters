//toggle the design for sorting search results
$(document).ready(function() {
	$("#toggle").click(function(){
		$("#properties").toggle();
		$("#content-header").toggle();
	});

//when the search happens	
	$("#submit-search").click(function(){
	
		//store the value
		search_value = $("#submit-search").val();
		
		//move the search box out of the way of the results
		$("#header-start").animate({marginTop:"0"});
	
		//perform the ajax call asynchronously
		
		//change the URL
		history.pushState(search_value,"Search","searchresults.html");
		
		//currently I'm just going to load the next page
		open("searchresults.html","_self","","false");
	});
});