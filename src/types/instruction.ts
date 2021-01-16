import { StationName, Line } from './station';

export type InstructionDetail = {
  initialStation: StationName;
  finalStation: StationName;
  numOfStops: number;
  lineTaken: Line;
};

export type Instruction = {
  linesTaken: Line[];
  numOfStopsInTotal: number;
  detail: InstructionDetail[];
};
