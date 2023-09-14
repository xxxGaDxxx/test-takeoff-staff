import { FC, useEffect } from 'react';
import { Typography } from '@/components/ui-toolkit/typography/Typography.tsx';
import { DeleteContactModalProps } from '@/components/contactModal/types.ts';
import Loader from '@/components/ui-toolkit/loader/Loader.tsx';
import { Modal } from '@/components/ui-toolkit/modal/modal.tsx';
import { Button } from '@/components/ui-toolkit/button/Button.tsx';
import styles from './ContactModals.module.scss';

const DeleteModal: FC<DeleteContactModalProps> = ({
  titleModal,
  phone,
  name,
  isOpen,
  isLoading,
  onOpenChange,
  onDelete,
}) => {
  const onCloseModal = () => {
    onOpenChange(false);
  };
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      onDelete();
    }
  };

  useEffect(() => {
    if (!isLoading) {
      onCloseModal();
    }
  }, [isLoading]);

  return (
    <Modal title={titleModal} isOpen={isOpen} onOpenChange={onOpenChange}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.containerInfo}>
          <div className={styles.container}>
            <Typography variant="body" as="span">
              Name:
            </Typography>
            <Typography variant="body" as="span">
              {name}
            </Typography>
          </div>
          <div className={styles.container}>
            <Typography variant="body" as="span">
              Phone:
            </Typography>
            <Typography variant="body" as="span">
              {phone}
            </Typography>
          </div>
        </div>
      )}
      <div className={styles.containerButton}>
        <Button variant="secondary" onClick={onCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={onDelete} onKeyDown={handleKeyDown}>
          Save
        </Button>
      </div>
    </Modal>
  );
};
export default DeleteModal;
