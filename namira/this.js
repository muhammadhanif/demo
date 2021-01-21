/*
# @author       : Muhammad Hanif
# @email        : moehammadhanif@gmail.com
# @telegram     : https://t.me/hanifmu
# @home page    : https://hanifmu.com
# @create date  : 2020-12-12 06:15:01
# @modify date  : 2020-12-12 06:15:01
*/

new Vue({
  el: "#post",
  data: {
    post: [],
  },
  components: {},

  mounted() {
    /*
      $.getJSON('https://www.instagram.com/masjidnamira/?__a=1', json => {
          this.post = json.graphql.user.edge_owner_to_timeline_media.edges
      })
      */

    axios
      .get("https://www.instagram.com/masjidnamira/?__a=1")
      .then(
        (response) =>
          (this.post =
            response.data.graphql.user.edge_owner_to_timeline_media.edges)
      );
  },
});
