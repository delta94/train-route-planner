import cx from 'classnames';

import styles from './Button.module.scss';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'basic';
};

const Button: React.FC<Props> = ({
  className,
  children,
  type = 'submit',
  variant = 'basic',
}) => {
  return (
    <button
      type={type}
      className={cx(
        className,
        styles.button,
        variant === 'basic' && styles.variantBasic
      )}
    >
      {children}
    </button>
  );
};

export default Button;
