const Images = [
    { image: require("../assets/event1.jpeg") },
    { image: require("../assets/event2.jpeg") },
];

export const markers = [
    {
      coordinate: {
        latitude: 49.2797959,
        longitude: -123.0974419,
      },
      title: "Go Home: DJ Pistachio & Downtown Solutions",
      description: "DJ PISTACHIO & DOWNTOWN SOLUTIONS present: GO HOME! ",
      image: Images[0].image,
      timing: "11:00 AM",
      location: "Addah",
      participants: 312,
    },
    {
      coordinate: {
        latitude: 49.2803897,
        longitude: -123.1126552,
      },
      title: "Raffi",
      description: "Stylish theatre that's home to Ballet BC & the Vancouver Opera, plus touring productions.",
      image: Images[1].image,
      timing: "11:00 AM - 2:00 PM",
      location: "Queen Elizabeth Theatre",
      participants: 1200,
    },
    {
      coordinate: {
        latitude: 49.2756562,
        longitude: -123.1096782,
      },
      title: "KAP SLAP - THE RETURN",
      description: "This is the third best food place",
      image: Images[0].image,
      timing: "11:00 PM - 3:00 AM",
      location: "ENSO EVENT CENTRE",
      participants: 800,
    },
    {
      coordinate: {
        latitude: 49.2805556,
        longitude: -123.1208333,
      },
      title: "Otoboke Beaver",
      description: "Check out the past concert and event calendar for Otoboke Beaver in Vancouver along with detailed ticket",
      image: Images[1].image,
      timing: "07:00 PM - 09:00 PM",
      location: "Commodore Ballroom",
      participants: 850,
    },
    {
      coordinate: {
        latitude: 49.2799513,
        longitude: -123.0992712,
      },
      title: "Treat Show Comedy (LATE SHOW)",
      description: "Treat Show is very good improvised comedy that happens Saturdays at 7:30 and 9:30 at China Cloud Studios",
      image: Images[0].image,
      timing: "07:30 PM - 09:00 PM",
      location: "The China Cloud",
      participants: 500,
    },
];

export const mapDarkStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#181818"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1b1b1b"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#2c2c2c"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8a8a8a"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#373737"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3c3c3c"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4e4e4e"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3d3d3d"
        }
      ]
    }
  ];

  export const mapStandardStyle = [
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
  ];
