import * as React from 'react';

// Components
import LineBadge from 'components/LineBadge';

// Constants
import { LINE_TO_COLOR } from 'constants/lineColor';

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
      <div className={styles.instructionHeader} onClick={onClick}>
        <div className={styles.lines}>
          {linesTaken.map((line, idx) => (
            <span key={line} className={styles.line}>
              {idx > 0 && <ArrowRight className={styles.arrowRightIcon} />}
              <LineBadge className={styles.lineBadge} line={line} />
            </span>
          ))}
        </div>
        <p className={styles.numOfStops}>{numOfStopsInTotal} stops</p>
      </div>
      {showDetail && (
        <div className={styles.instructionDetail}>
          {detail.map(
            ({ initialStation, finalStation, numOfStops, lineTaken }, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && (
                  <div className={styles.changeLine}>
                    Change line
                    <LineBadge
                      className={styles.changeLineBadge}
                      line={detail[idx - 1].lineTaken}
                    />
                    to
                    <LineBadge
                      className={styles.changeLineBadge}
                      line={lineTaken}
                    />
                  </div>
                )}
                <div className={styles.detailStep}>
                  <div
                    className={styles.connectorLine}
                    style={{ backgroundColor: LINE_TO_COLOR[lineTaken] }}
                  />
                  <div className={styles.stationName}>{initialStation}</div>
                  <div className={styles.stepNumOfStops}>
                    <LineBadge className={styles.lineBadge} line={lineTaken} />
                    <span>{numOfStops} stops</span>
                  </div>
                  <div className={styles.stationName}>{finalStation}</div>
                </div>
              </React.Fragment>
            )
          )}
        </div>
      )}
    </>
  );
}

export default InstructionComponent;
