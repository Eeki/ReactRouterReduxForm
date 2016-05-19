import React, {Component} from 'react';


export default class HomeFormMapBox extends Component {
  constructor(props) {
    super(props);

    this.map;

    this.source;
  }

  componentDidMount(){
    mapboxgl.accessToken = 'pk.eyJ1IjoiZWVraSIsImEiOiJjaW5kMXljMG0wMDUxd3pseWE3dnhmejYyIn0.dJu3Q0_7d37lXkRBvWLiow';
    const _this = this;

    this.map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/eeki/cio1636cn004cd8nvbc0bgwfb', //stylesheet location
      center: [24.942432, 60.163694], // starting position
      zoom: 11 // starting zoom
    });

    this.map.on('load', function load() {
      console.log("map loaded", _this.map.loaded());
      _this.map.addSource("markers", _this.source);
      _this.map.addLayer({
        "id": "markers",
        "type": "symbol",
        "source": "markers",
        "layout": {
          "icon-image": "{marker-symbol}-15",
          "text-field": "{title}",
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 0.6],
          "text-anchor": "top"
        }
      });

    })

    let sourceData;
    if(this.props.homeLocation.coordinates != null && this.props.homeLocation.address != null) {
      sourceData =this.parseSourceData(this.props.homeLocation.coordinates, this.props.homeLocation.address)
      this.map.flyTo({
        center: this.props.homeLocation.coordinates,
        zoom: 15
      })
    } else {
      sourceData = this.parseSourceData([null, null], "")
    }
    this.source = new mapboxgl.GeoJSONSource({data: sourceData});
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps",nextProps)
    if(nextProps.homeLocation.coordinates != null && nextProps.homeLocation.address != null) {
      this.setPosition(nextProps.homeLocation)
    }
  }

  parseSourceData(coordinates, address) {
    return {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": coordinates
      },
      "properties":{
        "title": address,
        "marker-symbol":"star"
      }
    }
  }

  setPosition(homeLocation) {
    this.source.setData(this.parseSourceData(homeLocation.coordinates, homeLocation.address));
    this.map.flyTo({
      center: homeLocation.coordinates,
      zoom: 15
    })
  }


  render() {
    return(
      <div id='map'></div>
    )
  }

}


//Löytyy lisää markkereita: https://github.com/mapbox/mapbox-gl-styles/tree/master/sprites