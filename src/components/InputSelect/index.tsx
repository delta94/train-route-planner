import * as React from 'react';

// Utils
import cx from 'classnames';
import { isSubstring } from '../../utils/string';

import styles from './InputSelect.module.scss';

type Options = Array<{ value: string; label: React.ReactNode }>;

type Props = {
  className?: string;
  placeholder?: string;
  options: Options;
  onSelect: (value: string) => void;
};
function InputSelect({ className, options, onSelect, placeholder }: Props) {
  const [showSelection, setShowSelection] = React.useState(false);
  const [value, setValue] = React.useState<string>('');
  const previousValue = React.useRef<string>('');

  const optionSelected = React.useMemo(
    () => options.find((opt) => opt.value === value),
    [value, options]
  );

  return (
    <div className={cx(styles.container, className)}>
      {optionSelected && (
        <div className={styles.optionSelected}>{optionSelected.label}</div>
      )}
      <input
        className={styles.input}
        value={value}
        placeholder={placeholder}
        onFocus={() => {
          setShowSelection(true);
          previousValue.current = value;
        }}
        onBlur={() => {
          setShowSelection(false);
          if (value && !options.find((opt) => opt.value === value)) {
            setValue(previousValue.current);
          } else if (value) {
            onSelect(value);
          }
        }}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      {showSelection && (
        <ul className={styles.listContainer}>
          {options
            .filter((option) => isSubstring(option.value, value))
            .map((option) => (
              <li
                key={option.value}
                className={cx(
                  styles.listItem,
                  option.value === value && styles.listItemSelected
                )}
                onMouseDown={() => {
                  setValue(option.value);
                  onSelect(option.value);
                }}
              >
                {option.label}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default InputSelect;
