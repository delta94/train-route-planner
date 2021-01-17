import * as React from 'react';

// Components
import InputSelect from 'components/InputSelect';
import LineBadge from 'components/LineBadge';
import Button from 'components/Button';
import FormController, { FormControllerProps } from 'components/FormController';

// Utils;
import { getStationAndTheLines } from 'utils/formatData';

// Assets
import { ReactComponent as Target } from 'assets/icons/target.svg';
import { ReactComponent as Dot } from 'assets/icons/dot.svg';
import { ReactComponent as MapPin } from 'assets/icons/map-pin.svg';

// Types
import { StationData } from 'types/station';

import styles from './FormInput.module.scss';

type Props = {
  stationData?: StationData;
  onSubmit: FormControllerProps['onSubmit'];
};

function FormInput({ stationData, onSubmit }: Props) {
  const listOfStationsToSelect = React.useMemo(() => {
    const listOfStations = getStationAndTheLines(stationData ?? {});
    return Object.entries(listOfStations).map(([station, lines]) => ({
      value: station,
      label: (
        <>
          <span>{station}</span>
          {lines.map((line) => (
            <LineBadge key={line} className={styles.lineBadge} line={line} />
          ))}
        </>
      ),
    }));
  }, [stationData]);

  return (
    <FormController
      className={styles.form}
      fields={{ source: { value: '' }, destination: { value: '' } }}
      onSubmit={onSubmit}
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
            options={listOfStationsToSelect}
            onSelect={(value) =>
              setFields((fields) => ({ ...fields, source: { value } }))
            }
            error={fields['source'].error}
          />
          <InputSelect
            placeholder="Choose destination"
            options={listOfStationsToSelect}
            onSelect={(value) =>
              setFields((fields) => ({ ...fields, destination: { value } }))
            }
            error={fields['destination'].error}
          />
          <Button className={styles.submitButton}>Submit</Button>
        </>
      )}
    </FormController>
  );
}

export default FormInput;
