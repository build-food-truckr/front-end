import axios from 'axios'


//fetch User Location
//location action
export function fetchUserLocation() {
  return axios.get('https://ipinfo.io?token=ea7f69e10eff85')
}

// // fetch venues by lat & lng 
export function fetchFoodTrucksByLatLng(location){
    console.log({
        secret: process.env.secret,
        id: process.env.id,
      })

    const ID = process.env.id;
    const SECRET = process.env.secret;

    const foodTruck = "4bf58dd8d48988d120941735";
    // const karaokeBox = "5744ccdfe4b0c0459246b4bb"; 
    return axios.get(`https://api.foursquare.com/v2/venues/search?client_id=${ID}&client_secret=${SECRET}&v=20180323&limit=20&near=${location}&categoryId=${foodTruck}&&radius=10000`)
}