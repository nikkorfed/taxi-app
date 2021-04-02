import { useState, useEffect, useRef } from "react";
import axios from "axios";

import { parseRoute } from "../utils/route";
import sleep from "../utils/sleep";

export default () => {
  const [from, setFrom] = useState({ text: "" });
  const [to, setTo] = useState({ text: "" });
  const [options, setOptions] = useState([]);
  const [route, setRoute] = useState([]);

  const map = useRef(null);

  let toLocation = (target) => map.current.animateCamera({ center: target, zoom: 16 }, { duration: 300 });
  let toCurrentLocation = () => navigator.geolocation.getCurrentPosition(({ coords }) => toLocation(coords));

  let editFrom = (text) => setFrom({ text });
  let editTo = (text) => setTo({ text });

  let getOptions = async (type) => {
    let input = (type == "from" && from.text) || (type == "to" && to.text);
    if (!input) return;

    // let key = 'ruslnb3529'; // 2ГИС
    // let response = await axios.get(`https://catalog.api.2gis.com/3.0/items/geocode?q=${input}&fields=items.point&key=${key}`);

    let key = "031c2f64-8f4f-4071-832a-efca359c078f"; // Яндекс
    let response = await axios.get(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${key}&geocode=${input}`);

    // let options = data.result.items; // 2ГИС

    let options = response.data.response.GeoObjectCollection.featureMember; // Яндекс
    options = options.map(({ GeoObject }) => ({
      type,
      text: GeoObject.name,
      description: GeoObject.description,
      longitude: GeoObject.Point.pos.split(" ")[0],
      latitude: GeoObject.Point.pos.split(" ")[1],
    }));

    setOptions(options);
  };

  let chooseOption = (option) => {
    if (option.type == "from") setFrom(option);
    else if (option.type == "to") setTo(option);
    setOptions([]);
  };

  let drawRoute = async () => {
    const body = {
      locale: "ru",
      points: [
        { type: "pedo", x: from.point.lon, y: from.point.lat },
        { type: "pedo", x: to.point.lon, y: to.point.lat },
      ],
      type: "jam",
    };
    const response = await axios.post(`https://catalog.api.2gis.com/carrouting/6.0.0/global?key=ruslnb3529`, body);
    let points = parseRoute(response.data);
    setOptions([]);
    setRoute(points);
    map.current.fitToCoordinates(points ? points : route, { edgePadding: { top: 100, left: 20, right: 20, bottom: 0 }, animated: true });
  };

  let animateRoute = async () => {
    let step = 10000 / route.length;
    for (let point of route) {
      map.current.animateCamera({ center: point, zoom: 14 }, { duration: step });
      await sleep(step);
    }
  };

  let resetFrom = () => {
    setFrom("");
    setOptions([]);
    setRoute([]);
  };

  let resetTo = () => {
    setTo("");
    setOptions([]);
    setRoute([]);
  };

  useEffect(toCurrentLocation, []);

  return {
    map,
    from: { value: from.text, set: editFrom, reset: resetFrom },
    to: { value: to.text, set: editTo, reset: resetTo },
    options: { value: options, get: getOptions, choose: chooseOption },
    route: { value: route, draw: drawRoute, animate: animateRoute },
    toLocation,
  };
};
