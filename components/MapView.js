import React from "react";

import MapView, { PROVIDER_GOOGLE, UrlTile, Polyline, Marker } from "react-native-maps";

export default ({ mapRef, route }) => {
  const tilesUrl = "https://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=1&r=g&ts=online_hd";
  // const tilesUrl = "http://vec04.maps.yandex.net/tiles?l=map&v=4.55.2&z={z}&x={x}&y={y}&scale=2&lang=ru_RU";

  const props = {
    mapType: "none",
    provider: PROVIDER_GOOGLE,
    minZoomLevel: 15,
    maxZoomLevel: 17,
    showsUserLocation: true,
    style: { flex: 1, opacity: 0.7 },
    ref: mapRef,
  };

  return (
    <MapView {...props}>
      <UrlTile urlTemplate={tilesUrl} />
      {route.length > 0 && <Polyline coordinates={route} strokeColor="dodgerblue" strokeWidth={5} style={{ zIndex: 3 }} />}
      {route.length > 0 && <Marker coordinate={route[route.length - 1]} />}
    </MapView>
  );
};
