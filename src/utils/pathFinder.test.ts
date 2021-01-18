import { formatStationDataToByLine, buildGraph, findPaths } from './pathFinder';

describe('formatStationDataToByLine', () => {
  it('should return correct output', () => {
    const input = {
      Admiralty: { NS: 10 },
      Aljunied: { EW: 9 },
      Fake: { EW: 1 },
    };
    const output = {
      NS: {
        10: 'Admiralty',
      },
      EW: {
        1: 'Fake',
        9: 'Aljunied',
      },
    };

    expect(formatStationDataToByLine(input)).toEqual(output);
  });
});

describe('buildGraph', () => {
  it('should return correct output', () => {
    const input = {
      EW: {
        1: 'Fake',
        9: 'Aljunied',
      },
    };
    const output = {
      Fake: [{ station: 'Aljunied', line: 'EW', endOfLine: 'Aljunied' }],
      Aljunied: [{ station: 'Fake', line: 'EW', endOfLine: 'Fake' }],
    };

    expect(buildGraph(input)).toEqual(output);
  });
});

describe('findPaths', () => {
  it('should return correct output', () => {
    const inputGraph = {
      Fake: [{ station: 'Aljunied', line: 'EW', endOfLine: 'Aljunied' }],
      Aljunied: [
        { station: 'Fake', line: 'EW', endOfLine: 'Fake' },
        { station: 'Potong Pasir', line: 'NE', endOfLine: 'Punggol' },
      ],
      'Potong Pasir': [{ station: 'Aljunied', line: 'NE', endOfLine: 'Fake' }],
    };
    const inputSource = 'Fake';
    const inputDestination = 'Potong Pasir';
    const output = [
      [
        { station: 'Fake', line: '', endOfLine: '' },
        { station: 'Aljunied', line: 'EW', endOfLine: 'Aljunied' },
        { station: 'Potong Pasir', line: 'NE', endOfLine: 'Punggol' },
      ],
    ];

    expect(findPaths(inputGraph, inputSource, inputDestination)).toEqual(
      output
    );
  });
});
