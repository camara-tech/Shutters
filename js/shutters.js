$(document).ready(function() {

//when the search happens	
	$("#searchControl").submit(function(){
		$search_value = $(this).serialize();
	
		//move the search box out of the way of the results
		$("#header").animate({marginTop:"0"});
		$("#header").animate({fontSize:"1em"});
	
		//change the URL
		history.pushState($search_value,"Search","searchresults.html");
		
		//show the loading screen
		$("#loading").fadeIn();

		//perform the ajax call asynchronously
		$.getJSON("js/searchresults.json",function(data) {
			for (var i = 0; i<data.length;i++) {
				
				// pull out all the data for one object
				$productName = data[i].ProductName;
				$price = data[i].Price.toString();
			    $avgRating = data[i].AvgRating.toString();
				$numRatings = data[i].NumRatings.toString();
				$featured = data[i].Featured;
				$image = data[i].image;
				
				//build the html for the object
				$html = "<div class = 'item'><div id='image'><img src='" + $image + "' width=150 height=135></div><div id='name'><h2>"+$productName+"</h2></div><div id='rating'>Rating: "+$avgRating+" out of 10("+$numRatings+")</div> <div id='price'><h3>Cost: $"+$price+"</h3></div>";
				if ($featured) {
					$html = $html + "<div id='featured'>Featured</div></div>";
				}
				else {
					$html = $html + "</div>";
				}
				$("#content").append($html);
			}
		});
			$("#loading").fadeOut();
			$("#properties").fadeIn();
			$("#content").slideDown();					
	});
});