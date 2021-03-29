// setup
var map = L.map('map', {
    center: [39.95, 116.4],
    zoom: 11
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
 }).addTo(map);

var showResults = function() {
  $('#page').hide();
  $('#results').show();
};

var layerGroup
var parsedData
// read dataset
var rawdata = "https://raw.githubusercontent.com/CPLN692-MUSA611-Open-Source-GIS/datasets/master/geojson/housingprice_Beijing.geojson"

// apply to each feature: bind popups function with "name", "area", "totalprice", "yearbuilt"
// on click event to show full information on each data point
var eachFeatureFunction = function(layer) {
    layer.on('click', function (event) {
        $('.name').text(layer.feature.properties.name)
        $('.total_price').text(layer.feature.properties.totalprice*10000)
        $('.area').text(layer.feature.properties.area)
        $('.price_perm2').text(layer.feature.properties.priceperm2)
        $('.bedrooms').text(layer.feature.properties.bedrooms)
        $('.floor').text(layer.feature.properties.floor)
        $('.builtyear').text(layer.feature.properties.yearbuilt)
        if (layer.feature.properties.schooldistrict === 1) {
          $('.school_district').text("Yes")
        } else {
          $('.school_district').text("No")
        }
        showResults();
    });
};

var currentPage = 0
//Slide 1 - all data points with popups: Housing Price in Beijing (size of marker for total price)
var slide1 = {
    title: "Housing Prices in Beijing",
    subtitle: "Total Price",
    content_line1: "The map to the right shows housing prices (total price) in Beijing. The sizes of the circles represent the prices, i.e. the larger the circle, the higher the total price. In general, the closer to the city center, the higher the total price. However, this data could be misleading as the total price depends on property size as well. The next three maps will be on a price per square meter basis for a more accurate representation of the price level and illustrate some factors that affect housing prices along the way.",
    content_line2: "Click on each property to see detail information.",
    style: function (feature) {
      return {
        radius: 0.03 * feature.properties.totalprice,
        fillOpacity: 0.3,
        color: "#000000",
        weight: 0.6,
      }
    }
  };

//Slide 2 - all data points with popups: Housing Price in Beijing (size of marker for price perm2)
var slide2 = {
    title: "Housing Prices in Beijing",
    subtitle: "Price / Square Meter",
    content_line1: "The map to the right shows prices per square meter instead of total price. Similarly, the sizes of the circles represent the prices. It is clear that the closer to the center city, the higher the price level. The most expensive areas are within Haidian District and Xicheng District.",
    content_line2: "Click on each property to see detail information.",
    style: function (feature) {
      return {
        radius: 0.0003 * feature.properties.priceperm2,
        fillOpacity: 0.3,
        color: "blue",
        weight: 0.6,
      }
    }
  };

//Slide 3 - breakdown by school districts (size of marker for price perm2, color group for school district)
var slide3 = {
    title: "Housing Prices in Beijing by School District Status",
    subtitle: "Price / Square Meter",
    content_line1: "The map to the right shows housing prices per square meter in relation to the school district status. The sizes of the circles represent the prices and the colors represent the school district status. In general, there are more homes at a higher price level within the school district than those outside the school district. This should not be surprising as families tend to value the education quality and factor it into consideration when purchasing a home.",
    content_line2: "Click on each property to see detail information.",
    style: function (feature) {
      switch (feature.properties.schooldistrict) {
        case '1': return {
          fillOpacity: 1,
          fillColor: "#6DC52A",
          color: "#000000",
          weight: 0.6,
          radius: 0.0003 * feature.properties.priceperm2
      }
        case '0': return {
          fillOpacity: 1,
          fillColor: "#828282",
          color: "#000000",
          weight: 0.6,
          radius: 0.0003 * feature.properties.priceperm2
        }
        case '': return {
          fillOpacity: 0,
          fillColor: "#828282",
          color: "#000000",
          weight: 0.6,
          radius: 0.0003 * feature.properties.priceperm2
        }
      }
    },
  };

//Slide 4 - breakdown by built year (size of marker for price perm2, color group for built year)
var slide4 = {
    title: "Housing Prices in Beijing by Built Year",
    subtitle: "Price / Square Meter",
    content_line1: "The last map shows housing prices per square meter in relation to the built year. The sizes of the circles represent the prices and the colors represent the built years. About half of the homes in this dataset were built before 2000 and the other half after 2000. The older homes are mostly located closer to the center city, while newer homes start to expand outwards - consistent with the urbanization that is normally seen across cities. Due to the premium location (along with the accessibility, convenience, resources, and services brought by the location), older built years don't have too significant of an effect on the housing prices.",
    content_line2: "Click on each property to see detail information.",
    style: function (feature) {
      if (feature.properties.yearbuilt <= 1980) {
        return {
          fillColor: "#581845",
          fillOpacity: 1,
          color: "#000000",
          weight: 0.6,
          radius: 0.0003 * feature.properties.priceperm2
        }  
      }
      if (feature.properties.yearbuilt > 1980 && feature.properties.yearbuilt <=1990 ) {
        return {
          fillColor: "#900C3F",
          fillOpacity: 1,
          color: "#000000",
          weight: 0.6,
          radius: 0.0003 * feature.properties.priceperm2
        } 
      }
      if (feature.properties.yearbuilt > 1990 && feature.properties.yearbuilt <=2000 ) {
        return {
          fillColor: "#C70039",
          fillOpacity: 1,
          color: "#000000",
          weight: 0.6,
          radius: 0.0003 * feature.properties.priceperm2
        } 
      }
      if (feature.properties.yearbuilt > 2000 && feature.properties.yearbuilt <=2010 ) {
        return {
          fillColor: "#FF5733",
          fillOpacity: 1,
          color: "#000000",
          weight: 0.6,
          radius: 0.0003 * feature.properties.priceperm2
      } 
    }
      if (feature.properties.yearbuilt > 2010) {
        return {
          fillColor: "#FFC300",
          fillOpacity: 1,
          color: "#000000",
          weight: 0.6,
          radius: 0.0003 * feature.properties.priceperm2
        } 
      }
    },
  };

var slides = [slide1, slide2, slide3, slide4] 

// event handling for proceeding forward in slideshow
var nextPage = function() {
  tearDown()
  $('.legend').hide();
  var nextPage = currentPage + 1
  console.log(nextPage)
  currentPage = nextPage
  buildPage(slides[nextPage])
  console.log(slides[nextPage])
}

// event handling for going backward in slideshow
var prevPage = function() {
  tearDown()
  $('.legend').hide();
  var prevPage = currentPage - 1
  currentPage = prevPage
  buildPage(slides[prevPage])
}

// remove all plotted data in prep for building the page with new filters etc
var tearDown = function() {
  map.removeLayer(layerGroup)
}

// build up a 'slide' given a page definition
var buildPage = function(slide) {
  $('#title').text(slide.title)
  $('#subtitle').text(slide.subtitle)
  $('.main1').text(slide.content_line1)
  $('.main2').text(slide.content_line2)
  layerGroup = L.geoJson (parsedData, {
    pointToLayer: function (feature,latlng) {
    return L.circleMarker (latlng,slide.style(feature))
    }
  }).addTo(map)
  layerGroup.eachLayer(eachFeatureFunction)
  if (currentPage === slides.length - 1) {
    $('#next').prop("disabled",true)
  } else {
    $('#next').prop("disabled",false)
  }
  if (currentPage === 0) {
    $('#prev').prop("disabled",true)
  } else {
    $('#prev').prop("disabled",false)
  }
  if (slides[currentPage].title === "Housing Prices in Beijing by School District Status") {
    $('#schooldistrict1').show();
    $('#schooldistrict0').show();
    $('#box_schooldistrict').show();
    $('label#schooldistrict').show();
  }
  if (slides[currentPage].title === "Housing Prices in Beijing by Built Year") {
    $('#y1980').show();
    $('#y1980-1990').show();
    $('#y1990-2000').show();
    $('#y2000-2010').show();
    $('#y2010').show();
    $('#box_year').show();
    $('#year').show();
  }
}

// close results
var closeResult = function () {
  $('#page').show();
  $('#results').hide();
}

// the buttons
$('#next').click(nextPage)
$('#prev').click(prevPage) 
$('#close').click(closeResult) 

// main function
$.ajax(rawdata).done(function(data) {
    parsedData = JSON.parse(data)
    buildPage(slides[currentPage])
})

