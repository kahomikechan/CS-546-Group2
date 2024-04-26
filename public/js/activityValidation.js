function sanitize(input) {
    return DOMPurify.sanitize(input);
  }
  
  const map = L.map("map").setView([40.745, -74.027], 14);
  
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);
  
  const activities = [
    {
      title: "Hoboken Historical Museum",
      rating: 4.6,
      reviews: 149,
      type: "Tourist attraction",
      address: "1301 Hudson St",
      latitude: 40.7511954,
      longitude: -74.0251241,
      price: "$16",
    },
    {
      title: "Hoboken Riverside Park",
      rating: 2.8,
      reviews: 152,
      type: "Tourist attraction",
      address: "Hoboken, NJ",
      latitude: 40.7521954,
      longitude: -74.0251241,
      price: "Free",
    },
    {
      title: "Pier C Park",
      rating: 4.8,
      reviews: 2200,
      type: "Tourist attraction",
      address: "340 Sinatra Dr",
      latitude: 40.7372579,
      longitude: -74.0271623,
      price: "$8",
    },
    {
      title: "Hudson River Waterfront Walkway",
      rating: 4.8,
      reviews: 1500,
      type: "Tourist attraction",
      address: "Sinatra Dr",
      latitude: 40.7401224,
      longitude: -74.0259351,
      price: "$18",
    },
    {
      title: "The Little Play Co.",
      rating: 3.9,
      reviews: 34,
      type: "Children's amusement center",
      address: "1400 Hudson St",
      latitude: 40.7385276,
      longitude: -74.0272119,
      price: "$21",
    },
    {
      title: "Elysian Park",
      rating: 4.6,
      reviews: 330,
      type: "Tourist attraction",
      address: "1001 Hudson St",
      latitude: 40.7538256,
      longitude: -74.024929,
      price: "$17",
    },
  ];
  
  function parsePrice(price) {
    if (price.toLowerCase() === "free") {
      return 0;
    }
    return parseFloat(price.replace("$", ""));
  }
  
  function updateSidebar(activities) {
    const parkList = document.getElementById("parkList");
    parkList.innerHTML = "";
  
    activities.forEach(function (activity) {
      const address = activity.address || "N/A";
      const price = activity.price || "Free";
      parkList.innerHTML += `<p><strong>${activity.title}</strong> - ${address}<br>Rating: ${activity.rating}<br>Price: ${price}</p>`;
    });
  }
  
  function updateMap(maxRating, maxPrice) {
    map.eachLayer(function (layer) {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });
  
    const filteredActivities = activities.filter(function (activity) {
      const activityPrice = parsePrice(activity.price);
      return activity.rating <= maxRating && activityPrice <= maxPrice;
    });
  
    filteredActivities.forEach(function (activity) {
      const marker = L.marker([activity.latitude, activity.longitude]).addTo(map);
      marker.bindPopup(
        `<strong>${activity.title}</strong><br>Rating: ${activity.rating}<br>Price: ${activity.price}`
      );
    });
  
    updateSidebar(filteredActivities);
  }
  
  function applyFilters() {
    const maxRating = parseInt(document.getElementById("ratingFilter").value, 10);
    const maxPrice = parseFloat(document.getElementById("priceFilter").value);
    updateMap(maxRating, maxPrice);
  }
  
  document
    .getElementById("ratingFilter")
    .addEventListener("change", applyFilters);
  document.getElementById("priceFilter").addEventListener("change", applyFilters);
  
  applyFilters();
