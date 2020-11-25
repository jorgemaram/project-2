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
            { center: { lat: 40.416636, lng: -3.703483 }, zoom: 13, styles: mapStyles.aubergine }
        )
    }

    function getPlacesFromAPI() {

        axios
            .get('/api/usuarios/:id')
            .then(response => {
                drawMarkers(response.data)
            })
            .catch(err => console.log(err))
    }


    function drawMarkers(user) {
        console.log(user)
        user => {
            let position = { lat: user.location.coordinates[0], lng: user.location.coordinates[1] }
            new google.maps.Marker({
                map: mapInstance,
                position,
                title: elm.name
            })
        }

        mapInstance.setCenter({ lat: users[0].location.coordinates[0], lng: users[0].location.coordinates[1] })
    }
} 