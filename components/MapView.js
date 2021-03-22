import React, { useEffect } from "react";
import {} from "react-native";

import MapView, { PROVIDER_GOOGLE, UrlTile, Polyline, Marker } from "react-native-maps";

export default ({ route, map }) => {
  const tilesUrl = "https://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=1&r=g&ts=online_hd";
  // const tilesUrl = "http://vec04.maps.yandex.net/tiles?l=map&v=4.55.2&z={z}&x={x}&y={y}&scale=2&lang=ru_RU";
  return (
    <MapView provider={PROVIDER_GOOGLE} mapType="none" showsUserLocation={true} style={{ flex: 1, opacity: 0.6 }} ref={map}>
      <UrlTile urlTemplate={tilesUrl} />
      {Boolean(route.length) && <Polyline coordinates={route} strokeColor="dodgerblue" strokeWidth={5} style={{ zIndex: 3 }} />}
      {Boolean(route.length) && <Marker coordinate={route[route.length - 1]} />}
    </MapView>
  );
};
