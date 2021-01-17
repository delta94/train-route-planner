import * as React from 'react';

// Components
import InputSelect from '../../components/InputSelect';
import LineBadge from '../../components/LineBadge';
import Button from '../../components/Button';

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

  const listOfStations = React.useMemo(
    () => getStationAndTheLines(stationData ?? {}),
    [stationData]
  );

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          console.log(`From ${source} to ${destination}`);
          // const paths = pathFinder(stationData!, source, destination);
          // console.log(formatResultsAsInstruction(paths));
        }}
      >
        <div className={styles.labelIcons}>
          <Target className={styles.icon} />
          <Dot className={styles.icon} />
          <Dot className={styles.icon} />
          <MapPin className={styles.icon} />
        </div>
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
        <Button className={styles.submitButton}>Submit</Button>
      </form>
    </div>
  );
}

export default Home;
