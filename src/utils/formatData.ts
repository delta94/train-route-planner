import { StationData, StationAndTheLines, Path, Line } from '../types/station';
import { Instruction, InstructionDetail } from '../types/instruction';

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

export function formatResultsAsInstruction(paths: Path[]) {
  const instructions: Instruction[] = [];
  paths.forEach((path) => {
    let previousStation = path[0].station;
    let numOfStopsInTotal = 0,
      currentNumOfStops = 0;
    const linesTaken = new Set<Line>();
    const instructionDetails: InstructionDetail[] = [];
    for (let i = 0; i < path.length - 1; i++) {
      path[i].line && linesTaken.add(path[i].line);
      // if we don't change line, update number of stops
      if (i === 0 || path[i].line === path[i + 1].line) {
        numOfStopsInTotal++;
        currentNumOfStops++;
      } else {
        // on changing Line
        // wrap the steps as an instruction detail
        instructionDetails.push({
          initialStation: previousStation,
          finalStation: path[i].station,
          numOfStops: currentNumOfStops,
          line: path[i].line,
          endOfLine: path[i].endOfLine,
        });

        // update value after changing line
        previousStation = path[i].station;
        currentNumOfStops = 1;
        numOfStopsInTotal++;
      }
    }
    // at the very the end, wrap steps as an instruction detail
    instructionDetails.push({
      initialStation: previousStation,
      finalStation: path[path.length - 1].station,
      numOfStops: currentNumOfStops,
      line: path[path.length - 1].line,
      endOfLine: path[path.length - 1].endOfLine,
    });
    // add complete instruction for this path
    instructions.push({
      lines: Array.from<Line>(linesTaken),
      numOfStopsInTotal,
      detail: [...instructionDetails],
      showDetail: false,
    });
  });

  // expand first instruction card
  if (instructions.length > 0) {
    instructions[0].showDetail = true;
  }
  return instructions;
}
