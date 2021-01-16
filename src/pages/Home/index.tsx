import * as React from 'react';

// Utils;
import { fetchGET } from '../../utils/fetch';

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

  return <div>hello</div>;
}

export default Home;
