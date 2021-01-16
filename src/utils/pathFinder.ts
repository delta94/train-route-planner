import {
  StationData,
  LineToStations,
  GraphConnectionStations,
  Station,
  Path,
} from '../types/station';

export default function pathFinder(
  stationData: StationData,
  src: Station,
  dest: Station
) {
  const graphStations = buildGraph(formatStationDataToByLine(stationData));
  return findPaths(graphStations, src, dest);
}

// using BFS
const MAX_NUM_OF_STOPS_FROM_SHORTEST_PATH = 3;
const MAX_NUM_OF_PATHS = 3;
function findPaths(
  graphStations: GraphConnectionStations,
  src: Station,
  dest: Station
) {
  let shortestPath = -1,
    numOfPathFound = 0;
  // a queue to maintain queue of station to explore and all of its travlled stations
  const queue: Array<Path> = [];
  let currentPath: Path = [];
  currentPath.push(src);
  queue.push(currentPath);
  while (queue.length > 0) {
    currentPath = queue.shift() as Path;

    // if possible path is too far from the shortest path, skip
    if (
      shortestPath > 0 &&
      currentPath.length - shortestPath > MAX_NUM_OF_STOPS_FROM_SHORTEST_PATH
    ) {
      return;
    }
    const lastStationInThePath = currentPath[currentPath.length - 1];

    if (lastStationInThePath === dest) {
      console.log('Results => ', currentPath);
      // first path found is the shortest path because of the nature of BFS
      if (shortestPath === -1) {
        shortestPath = currentPath.length;
      }
      // limit number of paths found
      numOfPathFound++;
      if (numOfPathFound === MAX_NUM_OF_PATHS) {
        return;
      }
    }

    // eslint-disable-next-line no-loop-func
    graphStations[lastStationInThePath].forEach((nextConnectedStation) => {
      if (!currentPath.includes(nextConnectedStation)) {
        const newPath = currentPath.slice();
        newPath.push(nextConnectedStation);
        queue.push(newPath);
      }
    });
  }
}

/*
  Build graph in adjacency list
  Output: 
    {
      "Potong Pasir": ["Woodleigh", "Boon Keng"],
      ..
    }
*/
function buildGraph(lineToStations: LineToStations) {
  const adjacencyList: GraphConnectionStations = {};

  Object.entries(lineToStations).forEach(([_, stations]) => {
    let previousStation: string | undefined;
    Object.values(stations).forEach((station) => {
      if (previousStation) {
        // connect station -> previousStation
        if (adjacencyList[station] === undefined) {
          adjacencyList[station] = new Set();
        }
        adjacencyList[station].add(previousStation);
        // connect station <- previousStation
        if (adjacencyList[previousStation] === undefined) {
          adjacencyList[previousStation] = new Set();
        }
        adjacencyList[previousStation].add(station);
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
function formatStationDataToByLine(stationData: StationData) {
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
