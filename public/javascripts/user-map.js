window.onload = () => {
    let mapInstance2

    initApp()

    function initApp() {
        drawMap()
        getPlacesFromAPI()
    }


    function drawMap() {
        mapInstance2 = new google.maps.Map(
            document.querySelector('#usersMap'),
            { center: { lat: 40.416636, lng: -3.703483 }, zoom: 13, styles: mapStyles.lightPurple }
        )
    }

    function getPlacesFromAPI() {

        axios
            .get('/api/usuarios/detalles/:id')
            .then(response => {
                drawMarker(response.data)
            })
            .catch(err => console.log(err))
    }


    function drawMarker(user) {
        console.log(user)
        user => {
            let position = { lat: user.location.coordinates[0], lng: user.location.coordinates[1] }
            new google.maps.Marker({
                map: mapInstance2,
                position,
                title: user.name
            })
        }
        mapInstance.setCenter({ lat: user[0].location.coordinates[0], lng: user[0].location.coordinates[1] })
    }
} 