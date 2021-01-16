import * as React from 'react';

// Utils;
import { fetchGET } from '../../utils/fetch';
import pathFinder from '../../utils/pathFinder';
import { formatResultsAsInstruction } from '../../utils/formatData';

// Types
import { StationData } from '../../types/station';

function Home() {
  const [isError, setIsError] = React.useState<boolean>(false);
  const [stationData, setStationData] = React.useState<StationData>();

  React.useEffect(() => {
    const getData = async () => {
      const response = await fetchGET<StationData>('/stations.json');
      if (response.error) {
        setIsError(true);
      } else {
        setStationData(response as StationData);
      }
    };

    getData();
  }, []);

  React.useEffect(() => {
    if (stationData) {
      const paths = pathFinder(stationData, 'Potong Pasir', 'Kent Ridge');
      console.log(paths);
      console.log(formatResultsAsInstruction(paths));
    }
  }, [stationData]);

  return <div>hello</div>;
}

export default Home;
