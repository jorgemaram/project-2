let searchApp = new Vue({

    el: '#app-search',

    data: {
        authorNameSearchString: "",
        photoFeed: null
    },

    mounted() {
        axios
            .get('api/users')
            .then(response => {
                this.photoFeed = response.data;
            })
            .catch(error => console.log(error))
    },

    computed: {

        filteredPhotoFeed: function () {

            let photos = this.photoFeed;
            let authorNameSearchString = this.authorNameSearchString;

            if (!authorNameSearchString) {
                return photos;
            }

            searchString = authorNameSearchString.trim().toLowerCase();

            photos = photos.filter(function (item) {
                if (item.author.toLowerCase().indexOf(authorNameSearchString) !== -1) {
                    return item;
                }
            })

            return photos;
        }
    }

});