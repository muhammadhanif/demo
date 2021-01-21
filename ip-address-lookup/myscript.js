/**
 * @author       : Muhammad Hanif
 * @email        : moehammadhanif@gmail.com
 * @telegram     : https://t.me/hanifmu
 * @home page    : https://hanifmu.com
 * @create date  : 2021-01-21 12:06:30
 * @modify date  : 2021-01-21 12:06:30
 */

new Vue({
  el: "#iplookup",
  data: {
    ip_form: "-",
    ip: "-",
    version: "-",
    city: "-",
    region: "-",
    country_name: "-",
    latitude: "-",
    longitude: "-",
    asn: "-",
    org: "-",
  },

  methods: {
    clear_maps: function () {
      var container = L.DomUtil.get("mapid");

      if (container != null) {
        container._leaflet_id = null;
      }
    },

    maps: function (used_for, latitude, longitude) {
      if (used_for == "error") {
        this.clear_maps();

        var mymap = L.map("mapid").setView([-1.263325, 118.606436], 4);
      } else {
        this.clear_maps();

        var mymap = L.map("mapid").setView([latitude, longitude], 11);
        L.marker([latitude, longitude]).addTo(mymap);
      }

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
    },

    init_data: function () {
      axios
        .get("https://ipapi.co/json")
        .then((json) => [
          (this.ip_form = json.data.ip),
          (this.ip = json.data.ip),
          (this.version = json.data.version),
          (this.city = json.data.city),
          (this.region = json.data.region),
          (this.country_name = json.data.country_name),
          (this.latitude = json.data.latitude),
          (this.longitude = json.data.longitude),
          (this.asn = json.data.asn),
          (this.org = json.data.org),
          this.maps("init", json.data.latitude, json.data.longitude),
        ])
        .catch((error) => {
          console.log(error);
        });
    },

    ip_in_maps: function (error = false, latitude, longitude) {
      if (error) {
        this.ip =
          '<span class="badge bg-danger rounded-pill">invalid ip address</span>';
        this.version =
          '<span class="badge bg-danger rounded-pill">invalid ip address</span>';
        this.city =
          '<span class="badge bg-danger rounded-pill">invalid ip address</span>';
        this.region =
          '<span class="badge bg-danger rounded-pill">invalid ip address</span>';
        this.country_name =
          '<span class="badge bg-danger rounded-pill">invalid ip address</span>';
        this.latitude =
          '<span class="badge bg-danger rounded-pill">invalid ip address</span>';
        this.longitude =
          '<span class="badge bg-danger rounded-pill">invalid ip address</span>';
        this.asn =
          '<span class="badge bg-danger rounded-pill">invalid ip address</span>';
        this.org =
          '<span class="badge bg-danger rounded-pill">invalid ip address</span>';
        this.maps("error", latitude, longitude);
      } else if (isNaN(latitude) && isNaN(longitude)) {
        this.maps("error", latitude, longitude);
      } else {
        this.maps("get_data", latitude, longitude);
      }
    },

    get_data: function (ip_address) {
      axios
        .get("https://ipapi.co/" + ip_address + "/json")
        .then((json) => [
          (this.ip = json.data.ip),
          (this.version = json.data.version),
          (this.city = json.data.city),
          (this.region = json.data.region),
          (this.country_name = json.data.country_name),
          (this.latitude = json.data.latitude),
          (this.longitude = json.data.longitude),
          (this.asn = json.data.asn),
          (this.org = json.data.org),
          this.ip_in_maps(
            (error = json.data.error),
            json.data.latitude,
            json.data.longitude
          ),
        ])
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mounted() {
    this.init_data();
  },
});
