let parseWktPolyline = (data) =>
  data
    .replace(/(LINESTRING\(|\))/g, "")
    .split(", ")
    .map((point) => ({ latitude: +point.split(" ")[1], longitude: +point.split(" ")[0] }));

let parseRoute = (response) => {
  let route = [];
  route.push(...parseWktPolyline(response.result[0].begin_pedestrian_path.geometry.selection));
  response.result[0].maneuvers.map((maneuver) => {
    maneuver.outcoming_path && maneuver.outcoming_path.geometry.map((geometry) => route.push(...parseWktPolyline(geometry.selection)));
  });
  route.push(...parseWktPolyline(response.result[0].end_pedestrian_path.geometry.selection));
  return route;
};

export { parseRoute };
