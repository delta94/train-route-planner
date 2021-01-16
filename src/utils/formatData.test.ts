import {
  getStationAndTheLines,
  formatResultsAsInstruction,
} from './formatData';

describe('getStationAndTheLines', () => {
  it('should return empty', () => {
    const input = {};
    const output = {};

    expect(getStationAndTheLines(input)).toEqual(output);
  });

  it('should return correct output', () => {
    const input = {
      Admiralty: { NS: 10 },
      Aljunied: { EW: 9, NS: 9 },
    };
    const output = {
      Admiralty: ['NS'],
      Aljunied: ['EW', 'NS'],
    };

    expect(getStationAndTheLines(input)).toEqual(output);
  });
});

describe('formatResultsAsInstruction', () => {
  it('should return correct output', () => {
    const input = [
      [
        { station: 'Potong Pasir', line: '' },
        { station: 'Boon Keng', line: 'NE' },
        { station: 'Farrer Park', line: 'NE' },
        { station: 'Little India', line: 'NE' },
        { station: 'Newton', line: 'DT' },
        { station: 'Stevens', line: 'DT' },
        { station: 'Botanic Gardens', line: 'DT' },
        { station: 'Farrer Road', line: 'CC' },
        { station: 'Holland Village', line: 'CC' },
        { station: 'Buona Vista', line: 'CC' },
        { station: 'one-north', line: 'CC' },
        { station: 'Kent Ridge', line: 'CC' },
      ],
    ];
    const output = [
      {
        detail: [
          {
            initialStation: 'Potong Pasir',
            finalStation: 'Little India',
            numOfStops: 3,
            lineTaken: 'NE',
          },
          {
            initialStation: 'Little India',
            finalStation: 'Botanic Gardens',
            numOfStops: 3,
            lineTaken: 'DT',
          },
          {
            initialStation: 'Botanic Gardens',
            finalStation: 'Kent Ridge',
            numOfStops: 5,
            lineTaken: 'CC',
          },
        ],
        linesTaken: ['NE', 'DT', 'CC'],
        numOfStopsInTotal: 11,
      },
    ];

    expect(formatResultsAsInstruction(input)).toEqual(output);
  });
});
