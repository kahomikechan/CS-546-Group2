function sanitize(input) {
  return DOMPurify.sanitize(input);
}

var map = L.map("map").setView([40.745, -74.027], 14); 

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(map);

var parks = [
  {
    title: "Hoboken Park",
    latitude: 40.7387114,
    longitude: -74.0272472,
    description: "Great park on the Hudson River.",
    rating: 4.8,
    reviews: 122,
    address: "Sinatra Dr",
  },
  {
    title: "Maxwell Place Park",
    latitude: 40.7495063,
    longitude: -74.023508,
    description: "Riverside green space & playground",
    rating: 3.8,
    reviews: 1000,
    address: "11TH Sinatra Dr N",
  },
  {
    title: "Pier C Park",
    latitude: 40.7401224,
    longitude: -74.0259351,
    description: "NYC views plus play areas & a promenade",
    rating: 4.8,
    reviews: 2200,
    address: "340 Sinatra Dr",
  },
  {
    title: "Hoboken Riverside Park",
    latitude: 40.7372579,
    longitude: -74.0271623,
    description: "Park on the waterfront with scenic views",
    rating: 4.8,
    reviews: 152,
    address: "Hoboken, NJ",
  },
  {
    title: "Elysian Park",
    latitude: 40.7483878,
    longitude: -74.025506,
    description: "Wooded urban green space for recreation",
    rating: 2.6,
    reviews: 330,
    address: "1001 Hudson St",
  },
  {
    title: "Sinatra Park",
    latitude: 40.7416691,
    longitude: -74.0259395,
    description: "Grassy area with NYC skyline views",
    rating: 4.7,
    reviews: 2400,
    address: "Sinatra Dr",
  },
  {
    title: "Columbus Park",
    latitude: 40.7485087,
    longitude: -74.0328225,
    description: "Athletic courts, gazebo & playground",
    rating: 4.6,
    reviews: 399,
    address: "Hoboken, NJ",
  },
  {
    title: "Southwest Park",
    latitude: 40.7378089,
    longitude: -74.0420218,
    description: "Cute park for a wedding",
    rating: 4.5,
    reviews: 118,
    address: "58 Jackson St",
  },
  {
    title: "Madison Park",
    latitude: 40.7415832,
    longitude: -74.0385498,
    description: "Best splash pad in Hoboken.",
    rating: 3.6,
    reviews: 120,
    address: "Madison St",
  },
  {
    title: "Church Square Park",
    latitude: 40.7421905,
    longitude: -74.0323613,
    description: "Great park. Dog runs. Playgrounds. Farmer's Market.",
    rating: 4.6,
    reviews: 61,
    address: "400 Garden St",
  },
  {
    title: "Shipyard Park",
    latitude: 40.7518192,
    longitude: -74.0242421,
    description: "Compact riverfront space with city views",
    rating: 4.6,
    reviews: 74,
    address: "1 13th St",
  },
  {
    title: "Stevens Park",
    latitude: 40.7414069,
    longitude: -74.0276121,
    description: "Park with a baseball field & dog run",
    rating: 4.5,
    reviews: 225,
    address: "Hudson St",
  },
  {
    title: "Jackson St. Park",
    latitude: 40.7399711,
    longitude: -74.0410743,
    description: "Athletic courts and a playground",
    rating: 4.4,
    reviews: 41,
    address: "116 Jackson St",
  },
  {
    title: "1600 Park",
    latitude: 40.7566947,
    longitude: -74.0286102,
    description: "Athletic fields and views of the Hudson.",
    rating: 2.4,
    reviews: 70,
    address: "1600 Park Ave",
  },
  {
    title: "Pier A Park",
    latitude: 40.7371143,
    longitude: -74.0262279,
    rating: 4.8,
    reviews: 23,
    address: "Hoboken, NJ",
  },
  {
    title: "Jefferson Park",
    latitude: 40.7390759,
    longitude: -74.0378843,
    rating: 4.8,
    reviews: 4,
    address: "1st Jefferson St",
  },
  {
    title: "Northwest Resiliency Park",
    latitude: 40.752825,
    longitude: -74.0341552,
    rating: 4.3,
    reviews: 16,
    address: "1201 Madison St",
  },
  {
    title: "Gateway Park",
    latitude: 40.7362335,
    longitude: -74.0422218,
    rating: 4.1,
    reviews: 8,
    address: "653 Newark St.",
  },
  {
    title: "7th & Jackson Resiliency Park",
    latitude: 40.7460462,
    longitude: -74.0386742,
    rating: 4.5,
    reviews: 18,
    address: "625-627 Jackson St",
  },
  {
    title: "Harborside Park",
    latitude: 40.7550423,
    longitude: -74.0278449,
    description: "Local playgrounds with waterfront views",
    rating: 4.7,
    reviews: 25,
    address: "1501 Park Ave",
  },
];

function updateSidebar(parks) {
  var parkList = document.getElementById("parkList"); 
  parkList.innerHTML = ""; // Clear previous content

  parks.forEach(function (park) {
    var description = park.description || "N/A"; // If undefined, set "N/A"
    parkList.innerHTML += `<p><strong>${park.title}</strong> - ${description}<br>Rating: ${park.rating}</p>`;
  });
}

function updateMap(maxRating) {
  
  map.eachLayer(function (layer) {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  // Filter parks based on maximum rating
  var filteredParks = parks.filter(function (park) {
    return park.rating <= maxRating;
  });

  // Add new markers to the map based on the filtered parks
  filteredParks.forEach(function (park) {
    var description = park.description || "N/A"; // If undefined, set "N/A"
    var marker = L.marker([park.latitude, park.longitude]).addTo(map); // Add marker
    marker.bindPopup(
      `<strong>${park.title}</strong><br>${description}<br>Rating: ${park.rating}`
    ); // Bind popup
  });

  updateSidebar(filteredParks);
}

document.getElementById("ratingFilter").addEventListener("change", function () {
  var maxRating = parseInt(this.value, 10); // Get selected maximum rating
  updateMap(maxRating); // Update map and sidebar based on the selected maximum rating
});

// Initially, show all parks (maximum rating of 5)
updateMap(5);