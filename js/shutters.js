//the shutter item model, represents each item in the search results
function ShutterItem(shutter) {
	var self = this;

	self.name = shutter.ProductName;
	self.price = "$" + shutter.Price;
	self.rating = shutter.AvgRating + " out of 10";
	self.image = "<img src='" + shutter.image + "' alt='" + self.name + "' height='177' width='190'	/>"
	
	if (shutter.Featured) {
	self.featured = "<img src='http://www.blinds.com/skin07/images/category/featured_graphic.png' alt=''/>"
	}
	else {
	self.featured = ""
	}
}

//the shutter view model
function ShuttersViewModel() {
	var self = this;
	
	var gridview = false;
	var listview = true;
	
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
		// switch to loading screen
		$("#content").fadeOut();
		$("#loading").fadeIn();
		//clear an old data
		self.shutters([]);
		// get the sorted results
		$.getJSON("js/alphabeticalsearchresults.json",function(data){
			for (var i=0;i<data.length;i++){
				// refill data
				self.shutters.push(newShutterItem(data[i]));
			}
		});
		
		//remove loading screen and show all the content
		$("#loading").fadeOut();
		$("#content").slideDown();
	}
	
	
	//what happens when the sort by price link is clicked
	self.sortByPrice = function () {
		// switch to loading screen
		$("#content").fadeOut();
		$("#loading").fadeIn();
		//clear an old data
		self.shutters([]);
		// get the sorted results
		$.getJSON("js/pricesortedsearchresults.json",function(data){
			for (var i=0;i<data.length;i++){
				// refill data
				self.shutters.push(newShutterItem(data[i]));
			}
		});
		
		//remove loading screen and show all the content
		$("#loading").fadeOut();
		$("#content").slideDown();
	}
	
	//what happens when the grid view link is clicked
	self.showGridView = function () {
		//change the html to use the css that renders a grid
		if (listview == true) {
			listview = false;
			$(".item").addClass("grid");
			gridview = true;
			
			
		}
	}
	
	//what happens when the List view link is clicked
	self.showListView = function () {
		//change the html to use the css that renders a list
		if (gridview == true) {
			gridview = false;
			$(".item").removeClass("grid");
			listview = true;
		}
	}
	
	//what happens when showing four items
	self.showFourItems = function() {
		//show only four items in the list/grid
		
	}
	
	//what happens when showing eight items
	self.showEightItems = function() {
		//show only eight Items in the list/grid
	}
	
	//what happens when showing infinite items
	self.showInfiniteItems = function() {}
		//load some items, load more items if the page scrolls down.
}

// setup knockout
ko.applyBindings(new ShuttersViewModel());