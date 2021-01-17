import * as React from 'react';

type Field = { value: string; error?: string };

type Fields = { [fieldName: string]: Field };

type Props = {
  className?: string;
  fields: Fields;
  onSubmit: (fields: Fields, isValid: boolean) => void;
  children: (args: {
    fields: Fields;
    setFields: React.Dispatch<React.SetStateAction<Fields>>;
  }) => JSX.Element;
};

const FormController: React.FC<Props> = ({
  fields: initialFields,
  className,
  onSubmit,
  children,
}) => {
  const [fields, setFields] = React.useState<Fields>(initialFields);

  return (
    <form
      className={className}
      onSubmit={(e) => {
        e.preventDefault();

        let isValid = true;
        Object.entries(fields).forEach(([fieldName, fieldData]) => {
          if (!fieldData.value) {
            setFields((field) => ({
              ...field,
              [fieldName]: {
                ...field[fieldName],
                error: 'Please input the empty field',
              },
            }));
            isValid = false;
          }
        });
        onSubmit(fields, isValid);
      }}
    >
      {children({ fields, setFields })}
    </form>
  );
};

export default FormController;
