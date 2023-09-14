import { FC, useEffect } from 'react';
import { useModalForm } from '@/components/contactModal/schemaModalForm.ts';
import { EditOrAddModalProps } from '@/components/contactModal/types.ts';
import { Modal } from '@/components/ui-toolkit/modal/Modal.tsx';
import { Button } from '@/components/ui-toolkit/button/Button.tsx';
import ControlledInput from '@/components/ui-toolkit/controlled/controlledInput.tsx';
import styles from './ContactModals.module.scss';

const EditOrAddModal: FC<EditOrAddModalProps> = ({
  titleModal,
  phone,
  name,
  isLoading,
  isOpen,
  onOpenChange,
  onSubmit,
}) => {
  const { control, handleSubmit, setValue, setError } = useModalForm(onSubmit);

  const onCloseModal = () => {
    if (name && phone) {
      setValue('name', name);
      setValue('phone', phone);
    } else {
      setValue('name', '');
      setValue('phone', '');
    }
    setError('name', { message: undefined });
    setError('phone', { message: undefined });
    onOpenChange(false);
  };

  useEffect(() => {
    if (!isLoading) {
      onCloseModal();
    }
  }, [isLoading]);

  useEffect(() => {
    setValue('name', name || '');
    setValue('phone', phone || '');
  }, [name, phone]);

  const handlePhoneChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    setValue('phone', numericValue);
  };

  return (
    <Modal title={titleModal} isOpen={isOpen} onOpenChange={onCloseModal}>
      <form onSubmit={handleSubmit}>
        <ControlledInput
          label="Name"
          name="name"
          control={control}
          placeholder="name"
          autoComplete="current-name"
          containerProps={{ className: styles.textField }}
        />

        <ControlledInput
          label="Phone"
          name="phone"
          control={control}
          type="tel"
          placeholder="phone"
          autoComplete="current-phone"
          containerProps={{ className: styles.textField }}
          onValueChange={handlePhoneChange}
        />

        <div className={styles.containerButton}>
          <Button variant="secondary" onClick={onCloseModal}>
            Close
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditOrAddModal;
