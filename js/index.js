var map;
var markers = [];
var infoWindow;
var locationSelect;


function initMap() {
    var LosAngelos = {
        lat: 34.063380,
        lng: -118.358080
    };
    map = new google.maps.Map(document.getElementById('map'), {
        center: LosAngelos,
        zoom: 11,
        mapTypeId: 'roadmap',
    })
    infoWindow = new google.maps.InfoWindow();

    //showStorMarket();
    SearchStores();
    //DisplayStores();
    //SetOnClickListner();

}

function clearLocations(){
    infoWindow.close();
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers.length = 0;
}


function DisplayStores(stores) {
    var storeshtml = '';
    stores.forEach(function (store, index) {
        var adress = store.addressLines
        var phone = store.phoneNumber
        storeshtml += `
        <div class="store-container">
            <div class="store-container-background">
                <div class="store-info-container">
                    <div class="store-adress">
                        <span>${adress[0]}</span>
                        <span>${adress[1]}</span>
                    </div>
                    <div class="store-phone">
                            ${phone}
                    </div>
                </div>
                <div class="store-number-container">
                    <div class="store-number">${index + 1}</div>
                </div>
            </div>
        </div>`

    });
    document.querySelector('.store-liste').innerHTML = storeshtml;
}

function showStorMarket(stores) {
    var bounds = new google.maps.LatLngBounds();

    stores.forEach(function (store, index) {
        var latlng = new google.maps.LatLng(
            store.coordinates.latitude,
            store.coordinates.longitude);
        var name = store.name;
        var adress = store.addressLines[0];
        var brand = store.brandName
        createMarker(latlng, name, adress, brand, index);
        bounds.extend(latlng);

    })
    map.fitBounds(bounds);


}

function SearchStores() {
    var foundstores = [];
    var zipcode = document.getElementById("zip-code-input").value;
    if (zipcode) {
        stores.forEach(function (store, index) {
            var postal = store.address.postalCode.substring(0,5);
            if (postal === zipcode) {
                foundstores.push(store);
            }
        })

    }else {
        foundstores= stores
    }
    console.log(foundstores);
    clearLocations()
    DisplayStores(foundstores);
    showStorMarket(foundstores);
    SetOnClickListner();
}

function SetOnClickListner() {
    var storelement = document.querySelectorAll(".store-container")
    storelement.forEach(function (store, index) {
        store.addEventListener('click', function () {
            new google.maps.event.trigger(markers[index], 'click')
        })
    })
}

function createMarker(latlng, name, address, brand, index) {
    var html = "<b> " + brand + "</b> <br/>" + name + "</b> <br/> <i class=\"fas fa-map-marker-alt\"></i>" + address;
    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        //icon : 'https://img.icons8.com/plasticine/40/000000/coronavirus.png',
        label: `${index + 1}`
    });
    infoWindow = new google.maps.InfoWindow;
    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    });
    markers.push(marker);

}