class Markers {
  constructor() {
    this.actives = {};
  }

  addMarker(marker) {
    this.actives[marker.id] = marker;
    return marker;
  }

  removeMarker(id) {
    delete this.actives[id];
  }

  updateMarker({id, lng, lat}) {
    this.actives[id].lng = lng;
    this.actives[id].lat = lat;
  }
}

module.exports = Markers;
