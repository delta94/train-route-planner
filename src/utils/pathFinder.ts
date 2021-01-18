import {
  StationData,
  LineToStations,
  GraphConnectionStations,
  StationName,
  Path,
} from '../types/station';

export default function pathFinder(
  stationData: StationData,
  src: StationName,
  dest: StationName
) {
  const graphStations = buildGraph(formatStationDataToByLine(stationData));
  return findPaths(graphStations, src, dest);
}

// using BFS
const MAX_NUM_OF_STOPS_FROM_SHORTEST_PATH = 3;
const MAX_NUM_OF_PATHS = 3;
export function findPaths(
  graphStations: GraphConnectionStations,
  src: StationName,
  dest: StationName
) {
  const results = [];
  let shortestPath = -1,
    numOfPathFound = 0;
  // a queue to maintain queue of station to explore and all of its travlled stations
  const queue: Array<Path> = [];
  let currentPath: Path = [];
  currentPath.push({
    station: src,
    line: '', // empty first because we don't know yet which line is taken in this station
    endOfLine: '',
  });
  queue.push(currentPath);
  while (queue.length > 0) {
    currentPath = queue.shift() as Path;

    // if possible path is too far from the shortest path, skip
    if (
      shortestPath > 0 &&
      currentPath.length - shortestPath > MAX_NUM_OF_STOPS_FROM_SHORTEST_PATH
    ) {
      return results;
    }

    // check if we have arrived / found one working path
    const lastStationInThePath = currentPath[currentPath.length - 1];
    if (lastStationInThePath.station === dest) {
      results.push(currentPath);
      // first path found is the shortest path because of the nature of BFS
      if (shortestPath === -1) {
        shortestPath = currentPath.length;
      }
      // limit number of paths found
      numOfPathFound++;
      if (numOfPathFound === MAX_NUM_OF_PATHS) {
        return results;
      }
    }

    // add vertex to the queue according to BFS
    graphStations[lastStationInThePath.station].forEach(
      // eslint-disable-next-line no-loop-func
      (nextConnectedStation) => {
        // avoid loop by checking if station already exists in the path
        if (
          !currentPath.find((s) => s.station === nextConnectedStation.station)
        ) {
          const newPath = currentPath.slice();
          newPath.push({ ...nextConnectedStation });
          queue.push(newPath);
        }
      }
    );
  }
  return results;
}

/*
  Build graph in adjacency list
  Input:
    {
      "NS": {
        1: "Jurong East",
        2: "Admiralty",
        ...
      },
      ..
    }
  Output: 
    {
      "Potong Pasir": [
        { station: "Woodleigh", line: 'ES', endLine: 'Jurong East' },
        { station: "Boon Keng", line: 'EW', endLine: 'Punggol' }
      ],
      ..
    }
*/
export function buildGraph(lineToStations: LineToStations) {
  const adjacencyList: GraphConnectionStations = {};

  Object.entries(lineToStations).forEach(([line, stations]) => {
    const arrayOfStations = Object.values(stations);
    const firstStationOnTheLine = arrayOfStations[0];
    const lastStationOnTheLine = arrayOfStations[arrayOfStations.length - 1];
    let previousStation: string | undefined;
    arrayOfStations.forEach((station) => {
      if (previousStation) {
        // connect station -> previousStation
        if (adjacencyList[station] === undefined) {
          adjacencyList[station] = [];
        }
        if (
          !adjacencyList[station].find((s) => s.station === previousStation)
        ) {
          adjacencyList[station].push({
            station: previousStation,
            line,
            endOfLine: firstStationOnTheLine,
          });
        }
        // connect station <- previousStation
        if (adjacencyList[previousStation] === undefined) {
          adjacencyList[previousStation] = [];
        }
        if (
          !adjacencyList[previousStation].find((s) => s.station === station)
        ) {
          adjacencyList[previousStation].push({
            station,
            line,
            endOfLine: lastStationOnTheLine,
          });
        }
      }
      previousStation = station;
    });
  });

  return adjacencyList;
}

/* 
  Format station data from .json
  Input:
    {
      "Admiralty": {"NS": 10},
      "Aljunied": {"EW": 9},
      ..
    }
  Output:
    {
      "NS": {
        1: "Jurong East",
        2: "Admiralty",
        ...
      },
      ..
    }
*/
export function formatStationDataToByLine(stationData: StationData) {
  const lineToStations: LineToStations = {};
  Object.entries(stationData).forEach(([station, lines]) => {
    Object.entries(lines).forEach(([line, order]) => {
      if (Array.isArray(order)) {
        order.forEach((n) => {
          if (lineToStations[line] === undefined) {
            lineToStations[line] = {};
          }
          lineToStations[line][n] = station;
        });
      } else {
        if (lineToStations[line] === undefined) {
          lineToStations[line] = {};
        }
        lineToStations[line][order] = station;
      }
    });
  });
  return lineToStations;
}
