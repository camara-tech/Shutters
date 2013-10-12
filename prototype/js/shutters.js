$(document).ready(function() {

//toggle the design for sorting search results
	$("#toggle").click(function(){
		$("#properties-style1").toggle();
		$("#properties-style2").toggle();
	});

//when the search happens	
	$("#searchControl").submit(function(){
		$search_value = $(this).serialize();
	
		//move the search box out of the way of the results
		$("#header-start").animate({marginTop:"0"});
	
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
				$html = "<div class = 'item'><span id='image'><img src='" + $image + "' width=150 height=135></span><span id='name'>"+$productName+"</span><span id='rating'>"+$avgRating+" out of 10("+$numRatings+")</span> <span id='price'>"+$price+"</span>";
				if ($featured) {
					$html = $html + "<span id='featured'>Featured</span></div>";
				}
				else {
					$html = $html + "</div>";
				}
				$("#content").append($html);
			}
			$("#loading").fadeOut();
			$("#toggle").fadeIn();
			$("#properties-style1").fadeIn();
			$("#content").slideDown();		
		});
			
	});
});