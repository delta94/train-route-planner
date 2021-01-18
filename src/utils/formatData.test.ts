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
        { station: 'Potong Pasir', line: '', endOfLine: '' },
        { station: 'Boon Keng', line: 'NE', endOfLine: 'HarbourFront' },
        { station: 'Farrer Park', line: 'NE', endOfLine: 'HarbourFront' },
        { station: 'Little India', line: 'NE', endOfLine: 'HarbourFront' },
        { station: 'Newton', line: 'DT', endOfLine: 'Bukit Panjang' },
        { station: 'Stevens', line: 'DT', endOfLine: 'Bukit Panjang' },
        { station: 'Botanic Gardens', line: 'DT', endOfLine: 'Bukit Panjang' },
        { station: 'Farrer Road', line: 'CC', endOfLine: 'Marina Bay' },
        { station: 'Holland Village', line: 'CC', endOfLine: 'Marina Bay' },
        { station: 'Buona Vista', line: 'CC', endOfLine: 'Marina Bay' },
        { station: 'one-north', line: 'CC', endOfLine: 'Marina Bay' },
        { station: 'Kent Ridge', line: 'CC', endOfLine: 'Marina Bay' },
      ],
    ];
    const output = [
      {
        detail: [
          {
            initialStation: 'Potong Pasir',
            finalStation: 'Little India',
            numOfStops: 3,
            line: 'NE',
            endOfLine: 'HarbourFront',
          },
          {
            initialStation: 'Little India',
            finalStation: 'Botanic Gardens',
            numOfStops: 3,
            line: 'DT',
            endOfLine: 'Bukit Panjang',
          },
          {
            initialStation: 'Botanic Gardens',
            finalStation: 'Kent Ridge',
            numOfStops: 5,
            line: 'CC',
            endOfLine: 'Marina Bay',
          },
        ],
        lines: ['NE', 'DT', 'CC'],
        numOfStopsInTotal: 11,
        showDetail: true,
      },
    ];

    expect(formatResultsAsInstruction(input)).toEqual(output);
  });
});
