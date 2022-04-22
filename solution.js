// let map;
// let limit = 10;
// const options = {
//     method: 'GET',
//     headers: {
//     Accept: 'application/json',
//     Authorization: 'fsq3Ke/JaRKjG1qPGsfGArts8sdoUixN9zpMBx+wLdbLWqw='
//   },
// };

// class LeafletMap {
//   constructor(coordinates) {
//     this.coordinates = coordinates;
//     this.businesses = [];
//     this.map = L.map("map", {
//       center: coordinates,
//       zoom: 14,
//     });
//     this.markers = {};
//   }

//   buildMap() {
//     // add openstreetmap tiles
//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(this.map);
//     // create and add geolocation marker
//     const userLocationMarker = L.circleMarker(this.coordinates);
//     userLocationMarker
//       .addTo(this.map)
//       .bindPopup("<p1><b>You are here!</b><br></p1>")
//       .openPopup();

//     setTimeout(() => userLocationMarker.closePopup(), 4000);
//   }

//   addMarkers() {
//     console.log("businesses");
//     console.log(this.businesses);
//     Object.keys(this.markers).forEach((marker) =>
//       this.markers[marker].remove()
//     );
//     for (let i = 0; i < this.businesses.length; i++) {
//       const latlng = [this.businesses[i].lat, this.businesses[i].long];
//       const marker = L.marker(latlng)
//         .bindPopup(
//           `<h3 style="margin: 0"><b>${this.businesses[i].name}</b></h3><br>
//           <img class="photo" src="${this.businesses[i].img_url}" /><br>
//           <p>${this.getDistanceInMiles(latlng)} miles</p>`
//         )
//         .addTo(this.map);
//       this.markers[this.businesses[i].name] = marker;
//     }
//   }

//   getDistanceInMiles(coords) {
//     return (this.map.distance(this.coordinates, coords) / 1609).toFixed(2);
//   }
// }

// // get coordinates via geolocation api
// async function getCoords() {
//   const pos = await new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
//   return [pos.coords.latitude, pos.coords.longitude];
// }
// //lag : 35.629442
// // long : -78.8193573
// // get foursquare businesses
// async function getFoursquare(business) {
// //   let lat = map.coordinates[35.629442];
// //   let lon = map.coordinates[-78.8193573];
//   let response = await fetch(
//     `https://api.foursquare.com/v3/places/search?query=${business}%20&ll=35.62%2C-78.81&radius=10000&limit=10`,
//     options
//   );
//   let data = await response.text();
//   let parsedData = JSON.parse(data);
//   let businesses = parsedData.results;
//   console.log(businesses)
//   return businesses;

// }
// // process foursquare array
// async function processBusinesses(data) {
//   let unresolvedBusinesses = data.map(async (place) => {
//     const imgResponse = await getBusinessPhoto(place.fsq_id);
//       console.log(place)
//       console.log(imgResponse)
//     return {
//       name: place.name,
//       lat: place.geocodes.main.latitude,
//       long: place.geocodes.main.longitude,
//       img_url: `${imgResponse[0].prefix}10x10${imgResponse[1].suffix}`,
//     };
//   });
//   await Promise.all(unresolvedBusinesses).then((resolved) => {
//     map.businesses = resolved;
//     map.addMarkers();
//   });
// }

// async function getBusinessPhoto(id) {
//   const response = await fetch(
//     `https://api.foursquare.com/v3/places/${id}/photos?limit=1`,
//     options
//   );
//   const data = await response.json();
//   return data;
// }

// // event handlers
// // window load
// window.onload = async () => {
//   const coords = await getCoords();
//   map = new LeafletMap(coords);
//   map.buildMap();
// };

// // business submit button
// document.getElementById("submit").addEventListener("click", async (event) => {
//   event.preventDefault();
//   let business = document.getElementById("business").value;
//   let data = await getFoursquare(business);
//   await processBusinesses(data);
// });