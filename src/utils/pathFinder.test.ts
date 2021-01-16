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
      Fake: [{ station: 'Aljunied', line: 'EW' }],
      Aljunied: [{ station: 'Fake', line: 'EW' }],
    };

    expect(buildGraph(input)).toEqual(output);
  });
});

describe('findPaths', () => {
  it('should return correct output', () => {
    const inputGraph = {
      Fake: [{ station: 'Aljunied', line: 'EW' }],
      Aljunied: [
        { station: 'Fake', line: 'EW' },
        { station: 'Potong Pasir', line: 'NE' },
      ],
      'Potong Pasir': [{ station: 'Aljunied', line: 'NE' }],
    };
    const inputSource = 'Fake';
    const inputDestination = 'Potong Pasir';
    const output = [
      [
        { station: 'Fake', line: '' },
        { station: 'Aljunied', line: 'EW' },
        { station: 'Potong Pasir', line: 'NE' },
      ],
    ];

    expect(findPaths(inputGraph, inputSource, inputDestination)).toEqual(
      output
    );
  });
});
