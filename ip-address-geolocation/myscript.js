/**
 * @author       : Muhammad Hanif
 * @email        : moehammadhanif@gmail.com
 * @telegram     : https://t.me/hanifmu
 * @home page    : https://hanifmu.com
 * @create date  : 2021-01-17 20:42:08
 * @modify date  : 2021-01-17 20:42:08
 */

new Vue({
  el: "#ipinfo",
  data: {
    ip_address: "-",
    city: "-",
    region: "-",
    country: "-",
    loc: "-",
    org: "-",
    timezone: "-",
  },

  methods: {
    user_in_maps: function (data_loc) {
      if (data_loc != 0) {
        var loc = data_loc.split(",");
        var latitude = loc[0];
        var longitude = loc[1];

        var mymap = L.map("mapid").setView([latitude, longitude], 11);

        L.tileLayer(
          "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
          {
            maxZoom: 18,
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
              'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
          }
        ).addTo(mymap);

        L.marker([latitude, longitude]).addTo(mymap);
      }
    },

    get_data: function () {
      axios
        .get("https://ipinfo.io/json")
        .then((json) => [
          (this.ip_address = json.data.ip),
          (this.city = json.data.city),
          (this.region = json.data.region),
          (this.country = json.data.country),
          (this.loc = json.data.loc),
          (this.org = json.data.org),
          (this.timezone = json.data.timezone),
          this.user_in_maps(json.data.loc),
          console.log(json),
        ])
        .catch((error) => {
          this.ip_address = 0;
          this.city = 0;
          this.region = 0;
          this.country = 0;
          this.loc = 0;
          this.org = 0;
          this.timezone = 0;
          document.getElementById("mapid").style.display = "none";
          console.log(error);
        });
    },
  },

  mounted() {
    this.get_data();
  },
});
