import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import { Input, InputProps } from '@/components/ui-toolkit/Input/Input.tsx';

type ControlledInputProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>; // Control<TFieldValues, TContext>
} & Omit<InputProps, 'value' | 'onChange' | 'onBlur'>;

const ControlledInput = <T extends FieldValues>({
  control,
  name,
  ...restProps
}: ControlledInputProps<T>) => {
  const {
    field,
    fieldState: { error }, // field: { value, onChange }
  } = useController({
    name,
    control,
  });

  return <Input {...field} errorMessage={error?.message} {...restProps} />;
};

export default ControlledInput;
