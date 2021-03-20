import { useState, useEffect, useRef } from "react";
import axios from "axios";

import { parseRoute } from "../utils/route";
import sleep from "../utils/sleep";

export default () => {
  const [from, setFrom] = useState({ full_name: "" });
  const [to, setTo] = useState({ full_name: "" });
  const [options, setOptions] = useState([]);
  const [route, setRoute] = useState([]);

  const map = useRef(null);

  let editFrom = (text) => setFrom({ text });
  let editTo = (text) => setTo({ text });

  let toLocation = (target) => map.current.animateCamera({ center: target, zoom: 16 }, { duration: 300 });
  let toCurrentLocation = () => navigator.geolocation.getCurrentPosition(({ coords }) => toLocation(coords));

  let getOptions = async (input) => {
    input = input.nativeEvent.text;
    if (!input) return;
    input = encodeURIComponent(input);
    let response = await axios.get(`https://catalog.api.2gis.com/3.0/items/geocode?q=${input}&fields=items.point&key=ruslnb3529`);
    return response.data;
  };

  let getOptionsFrom = async (input) => {
    let data = await getOptions(input);
    let options = data.result.items;
    options.map((option, index) => (options[index].optionType = "from"));
    setOptions(options);
  };

  let getOptionsTo = async (input) => {
    let data = await getOptions(input);
    let options = data.result.items;
    options.map((option, index) => (options[index].optionType = "to"));
    setOptions(options);
  };

  let chooseOption = (option) => {
    if (option.optionType == "from") setFrom(option);
    else if (option.optionType == "to") setTo(option);
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
    from: { value: from, set: editFrom, getOptions: getOptionsFrom, reset: resetFrom },
    to: { value: to, set: editTo, getOptions: getOptionsTo, reset: resetTo },
    options: { value: options, choose: chooseOption },
    route: { value: route, draw: drawRoute, animate: animateRoute },
    toLocation,
  };
};
