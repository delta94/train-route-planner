import * as React from 'react';

// Utils
import cx from 'classnames';

import styles from './InputSelect.module.scss';

type Options = Array<{ value: string; label: string }>;

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

  return (
    <div className={cx(styles.container, className)}>
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
            .filter((option) => option.value.match(new RegExp(value, 'i')))
            .map((option) => (
              <li
                key={option.value}
                className={cx(
                  styles.listItem,
                  option.value === value && styles.listItemSelected
                )}
                onMouseDown={() => {
                  setValue(option.label);
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
