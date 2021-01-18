import { StationName, Line } from './station';

export type InstructionDetail = {
  initialStation: StationName;
  finalStation: StationName;
  numOfStops: number;
  line: Line;
  endOfLine: Line; // to tell the direction because MRT runs on both directions
};

export type Instruction = {
  lines: Line[];
  numOfStopsInTotal: number;
  detail: InstructionDetail[];
  showDetail: boolean;
};
