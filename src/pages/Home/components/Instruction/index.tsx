import * as React from 'react';

// Components
import LineBadge from 'components/LineBadge';
// Assets
import { ReactComponent as ArrowRight } from 'assets/icons/arrow-right.svg';

// Types
import { Instruction } from 'types/instruction';

import styles from './Instruction.module.scss';

type Props = {
  instruction: Instruction;
  onClick: () => void;
};

function InstructionComponent({ instruction, onClick }: Props) {
  const { linesTaken, numOfStopsInTotal, detail, showDetail } = instruction;

  return (
    <>
      <div className={styles.instruction} onClick={onClick}>
        <div className={styles.lines}>
          {linesTaken.map((line, idx) => (
            <span key={line} className={styles.line}>
              {idx > 0 && <ArrowRight className={styles.arrowRightIcon} />}
              <LineBadge className={styles.lineBadge2} line={line} />
            </span>
          ))}
        </div>
        <p className={styles.numOfStops}>{numOfStopsInTotal} stops</p>
      </div>
      {showDetail && (
        <div>
          {detail.map(
            ({ initialStation, finalStation, numOfStops, lineTaken }) => (
              <div>
                <div>{initialStation}</div>
                <div>{finalStation}</div>
                <div>{numOfStops}</div>
                <div>{lineTaken}</div>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
}

export default InstructionComponent;
