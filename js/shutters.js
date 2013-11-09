//the shutter item model, represents each item in the search results
function ShutterItem(shutter) {
    var self = this;

    self.name = shutter.ProductName;
    self.price = "$" + shutter.Price;
    self.rating = "Rating: " + shutter.AvgRating + " out of 10";
    self.image = "<img src='" + shutter.image + "' alt='" + self.name + "' height='140' width='150' />";

    if (shutter.Featured) {
        self.featured = "<img src='http://www.blinds.com/skin07/images/category/featured_graphic.png' alt=''/>";
    } else {
        self.featured = "";
    }
}


//the shutter view model
function ShuttersViewModel() {
    var self, how_results_sorted;

    self = this;

    //State Variables

    //the array of shutters that we are messing with
    self.shutters = ko.observableArray();

    //the search term itself
    self.searchTerm = ko.observable("");

    //what happens when the search button is pressed
    self.submitSearch = function () {
        //make sure that we have an actual value to look for
        if (self.searchTerm() === "") {

            //we have no value, so we can't search for anything.
            $("#error").fadeIn();

        } else {

            //move the searchbox out of the way of the results
            $("#header").animate({marginTop: "0"});
            $("#header").animate({fontSize: "1em"});

            //change the URL for SEO
            history.pushState(self.searchTerm(), "Search", "searchresults.html");

            //hide the error message
            $("#error").fadeOut();

            //show the loading screen
            $("#content").fadeOut();
            $("#loading").fadeIn();

            self.shutters([]);
            
            //get the json and manipulate the info
            $.getJSON("json/searchresults.json", function (data) {
                for (var a = 0; a < data.length; a++) {
                self.shutters.push(new ShutterItem(data[a]));
                }
            });
            console.log(self.shutters());
            
            //remove loading screen and show #content
            $("#loading").fadeOut();
            $("#properties").fadeIn();
            $("#content").slideDown();
        }
    }

    //what happens when the sort by name link is clicked
    self.sortByName = function () {
        self.shutters([]);
        $.getJSON("json/alphabeticalsearchresults.json", function (data) {
            for (var a = 0; a < data.length; a++) {
                self.shutters.push(new ShutterItem(data[a]));
            }
        });
    }
    
    self.sortByFeatured = function () {
        self.shutters([]);
        $.getJSON("json/searchresults.json", function (data) {
            for (var a = 0; a < data.length; a++) {
                self.shutters.push(new ShutterItem(data[a]));
            }
        });
    }

    //what happens when the sort by price link is clicked
    self.sortByPrice = function () {
        self.shutters([]);
        $.getJSON("json/pricesortedsearchresults.json", function (data) {
                for (var a = 0; a < data.length; a++) {
                self.shutters.push(new ShutterItem(data[a]));
                }
        });
    }
}

// setup knockout
ko.applyBindings(new ShuttersViewModel());