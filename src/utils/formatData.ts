import { StationData, StationAndTheLines } from '../types/station';

/*
  To get station and its lines to be shown in the select input box
  Input stations data from .json file
  Output: {
    Boon Keng: ["NE"]
    Boon Lay: ["EW", "JS"]
    Botanic Gardens: ["CC", "CE", "DT"]  
    ...
  }
*/
export function getStationAndTheLines(stationData: StationData) {
  const stationAndTheLines: StationAndTheLines = {};
  Object.entries(stationData).forEach(([station, lines]) => {
    Object.keys(lines).forEach((line) => {
      if (stationAndTheLines[station] === undefined) {
        stationAndTheLines[station] = [line];
      } else {
        stationAndTheLines[station].push(line);
      }
    });
  });
  return stationAndTheLines;
}
