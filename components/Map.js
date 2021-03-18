import React, { useEffect } from "react";
import {} from "react-native";
import Config from "react-native-config";

import MapView, { UrlTile, Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";

export default Map = ({ route }) => {
  return (
    <MapView provider={PROVIDER_GOOGLE} mapType="none" showsUserLocation={true} style={{ flex: 1, opacity: 0.8 }} ref={map}>
      <UrlTile urlTemplate={Config.TWOGIS_TILES} />
      {Boolean(route.length) && <Polyline coordinates={route} strokeColor="dodgerblue" strokeWidth={5} style={{ zIndex: 3 }} />}
      {Boolean(route.length) && <Marker coordinate={route[route.length - 1]} />}
    </MapView>
  );
};
