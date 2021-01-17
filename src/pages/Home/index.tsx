import * as React from 'react';

// Components
import InputSelect from '../../components/InputSelect';
import LineBadge from '../../components/LineBadge';

// Utils;
import { fetchGET } from '../../utils/fetch';
import pathFinder from '../../utils/pathFinder';
import {
  formatResultsAsInstruction,
  getStationAndTheLines,
} from '../../utils/formatData';

// Assets
import { ReactComponent as Target } from '../../assets/icons/target.svg';
import { ReactComponent as Dot } from '../../assets/icons/dot.svg';
import { ReactComponent as MapPin } from '../../assets/icons/map-pin.svg';

// Types
import { StationData, StationName } from '../../types/station';

import styles from './Home.module.scss';

function Home() {
  const [isError, setIsError] = React.useState<boolean>(false);
  const [stationData, setStationData] = React.useState<StationData>();
  const [source, setSource] = React.useState<StationName>('');
  const [destination, setDestination] = React.useState<StationName>('');

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

  const listOfStations = React.useMemo(
    () => getStationAndTheLines(stationData ?? {}),
    [stationData]
  );

  return (
    <div className={styles.container}>
      <div className={styles.labelIcons}>
        <Target className={styles.icon} />
        <Dot className={styles.icon} />
        <Dot className={styles.icon} />
        <MapPin className={styles.icon} />
      </div>
      <div className={styles.form}>
        <InputSelect
          className={styles.inputFrom}
          placeholder="Choose starting point"
          options={Object.entries(listOfStations).map(([station, lines]) => ({
            value: station,
            label: (
              <>
                <span>{station}</span>
                {lines.map((line) => (
                  <LineBadge
                    key={line}
                    className={styles.lineBadge}
                    line={line}
                  />
                ))}
              </>
            ),
          }))}
          onSelect={(value) => setSource(value)}
        />
        <InputSelect
          placeholder="Choose destination"
          options={Object.entries(listOfStations).map(([station, lines]) => ({
            value: station,
            label: (
              <>
                <span>{station}</span>
                {lines.map((line) => (
                  <LineBadge
                    key={line}
                    className={styles.lineBadge}
                    line={line}
                  />
                ))}
              </>
            ),
          }))}
          onSelect={(value) => setDestination(value)}
        />
      </div>
    </div>
  );
}

export default Home;
