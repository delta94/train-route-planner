// Utils
import cx from 'classnames';
import { LINE_TO_COLOR } from '../../constants/lineColor';

import styles from './LineBadge.module.scss';

type Props = {
  className?: string;
  line: string;
};

function LineBadge({ className, line }: Props) {
  const color = LINE_TO_COLOR[line];
  return (
    <span
      className={cx(styles.line, className)}
      style={{ backgroundColor: color }}
    >
      {line}
    </span>
  );
}

export default LineBadge;
