//the shutter item model, represents each item in the search results
function ShutterItem(shutter) {
	var self = this;

	self.name = shutter.ProductName;
	self.price = "$" + shutter.Price;
	self.rating = shutter.AvgRating;
	self.image = "<img src='" + shutter.image + "' alt='" + self.name + "' />"
	
	if (shutter.Featured) {
	self.featured = "featured"
	}
	else {
	self.featured = ""
	}
}

//the shutter view model
function ShuttersViewModel() {
	var self = this;
	
	//the array of shutters that we are messing with
	self.shutters = ko.observableArray();
	
	//the search term itself
	self.searchTerm = ko.observable("");
	
	//what happens when the search button is pressed
	self.submitSearch = function() {
		//make sure that we have an actual value to look for
		if (self.searchTerm() == "") {
			
			//we have no value, so we can't search for anything.
			$("#error").fadeIn();
			
		} 
		else {
		
			//move the searchbox out of the way of the results
			$("#header").animate({marginTop:"0"});
			$("#header").animate({fontSize:"1em"});
		
			//change the URL
			history.pushState(self.searchTerm(),"Search","searchresults.html");
		
			//show the loading screen
			$("#content").fadeOut();
			$("#error").fadeOut();
			$("#loading").fadeIn();
			
			//clear any old data
			self.shutters([]);
			
			// Now, if we had a server, I would here use jQuery's ajax function,
			// Instead, I will be using the jQuery's getJSON function
			$.getJSON("js/searchresults.json",function(data) {
				for (var i = 0; i<data.length;i++) {
					//insert each object in the JSON into an observable array
					self.shutters.push(new ShutterItem(data[i]));
				}
			});
			
			//remove loading screen and show all the content
			$("#loading").fadeOut();
			$("#properties").fadeIn();
			$("#content").slideDown();	
		}
	}

	console.log(self.shutters());
	//what happens when the sort by name link is clicked
	self.sortByName = function () {
	}
	
	//what happens when the sort by price link is clicked
	self.sortByPrice = function () {
	}
	
	//what happens when the grid view link is clicked
	self.showGridView = function () {
	}
	
	//what happens when the List view link is clicked
	self.showListView = function () {
	}
	
		
}

// setup knockout
ko.applyBindings(new ShuttersViewModel());