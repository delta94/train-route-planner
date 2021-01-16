export type Station = string;
export type Path = Array<Station>;
export type Line = string;
/* 
From stations.json
{
  "Admiralty": {"NS": 10},
  "Aljunied": {"EW": 9},
  "Ang Mo Kio": {"NS": 16},
  ..
}
*/
export type StationData = {
  [station: string]: {
    [line: string]: number | number[]; // station number
  };
};

/* 
{
  "NS": {
    1: "Jurong East",
    2: "Admiralty",
    ...
  },
  "EW": {
    ...
  }
  ..
}
*/
export type LineToStations = {
  [line: string]: {
    [stationNumber: number]: Station;
  };
};

export type StationToLines = {
  [name: string]: Line[];
};

export type GraphConnectionStations = {
  [stationName: string]: Set<Station>;
};

export type StationAndTheLines = {
  [stationName: string]: Line[];
};
