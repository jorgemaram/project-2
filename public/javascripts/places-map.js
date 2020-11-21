window.onload = () => {
    let mapInstance

    initApp()

    function initApp() {
        drawMap()
        getPlacesFromAPI()
    }


    function drawMap() {
        mapInstance = new google.maps.Map(
            document.querySelector('#usersMap'),
            { center: { lat: 40.416636, lng: -3.703483 }, zoom: 16, styles: mapStyles.retro }
        )
    }

    function getPlacesFromAPI() {

        axios
            .get('/api/users')
            .then(response => drawMarkers(response.data))
            .catch(err => console.log(err))
    }


    function drawMarkers(users) {

        places.forEach(elm => {

            let position = { lat: elm.location.coordinates[0], lng: elm.location.coordinates[1] }

            new google.maps.Marker({
                map: mapInstance,
                position,
                title: elm.name
            })
        })

        mapInstance.setCenter({ lat: users[1].location.coordinates[0], lng: users[1].location.coordinates[1] })
    }
} 