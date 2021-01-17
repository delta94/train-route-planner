import * as React from 'react';

// Components
import InputSelect from '../../components/InputSelect';
import LineBadge from '../../components/LineBadge';
import Button from '../../components/Button';
import FormController from '../../components/FormController';
import InstructionComponent from './components/Instruction';

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
import { StationData } from '../../types/station';

import styles from './Home.module.scss';
import { Instruction } from '../../types/instruction';

function Home() {
  const [isError, setIsError] = React.useState<boolean>(false);
  const [stationData, setStationData] = React.useState<StationData>();
  const [instructions, setInstructions] = React.useState<Instruction[]>();

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
      <FormController
        className={styles.form}
        fields={{ source: { value: '' }, destination: { value: '' } }}
        onSubmit={(fields, isValid) => {
          const source = fields['source'].value;
          const destination = fields['destination'].value;
          console.log(`From ${source} to ${destination}`);
          if (isValid) {
            const paths = pathFinder(stationData!, source, destination);
            setInstructions(formatResultsAsInstruction(paths));
          }
        }}
      >
        {({ fields, setFields }) => (
          <>
            <div className={styles.labelIcons}>
              <Target className={styles.icon} />
              <Dot className={styles.icon} />
              <Dot className={styles.icon} />
              <Dot className={styles.icon} />
              <MapPin className={styles.icon} />
            </div>
            <InputSelect
              className={styles.inputFrom}
              placeholder="Choose starting point"
              options={Object.entries(listOfStations).map(
                ([station, lines]) => ({
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
                })
              )}
              onSelect={(value) =>
                setFields((fields) => ({ ...fields, source: { value } }))
              }
              error={fields['source'].error}
            />
            <InputSelect
              placeholder="Choose destination"
              options={Object.entries(listOfStations).map(
                ([station, lines]) => ({
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
                })
              )}
              onSelect={(value) =>
                setFields((fields) => ({ ...fields, destination: { value } }))
              }
              error={fields['destination'].error}
            />
            <Button className={styles.submitButton}>Submit</Button>
          </>
        )}
      </FormController>
      <div className={styles.instructionContainer}>
        {instructions?.map((instruction, idx) => (
          <InstructionComponent
            key={idx}
            instruction={instruction}
            onClick={() => {
              const newInstructions = [...instructions];
              newInstructions[idx].showDetail = !newInstructions[idx]
                .showDetail;
              setInstructions([...newInstructions]);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
