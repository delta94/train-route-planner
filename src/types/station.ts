export type StationName = string;
export type Station = { station: StationName; line: Line };
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
    [stationNumber: number]: StationName;
  };
};

export type StationToLines = {
  [name: string]: Line[];
};

export type GraphConnectionStations = {
  [stationName: string]: Array<Station>;
};

export type StationAndTheLines = {
  [stationName: string]: Line[];
};
