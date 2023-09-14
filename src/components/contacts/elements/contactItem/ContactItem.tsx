import { FC } from 'react';
import { ContactType } from '@/api/type.ts';
import { Typography } from '@/components/ui-toolkit/typography/Typography.tsx';
import { Button } from '@/components/ui-toolkit/button/Button.tsx';
import EditIcon from '@/assets/icons/EditIcon.tsx';
import TrashIcon from '@/assets/icons/TrashIcon.tsx';
import styles from './ContactItem.module.scss';

type ContactItemProps = {
  contact: ContactType;
  onUpdateModal: (contact: ContactType) => void;
  onDeleteModal: (contact: ContactType) => void;
};

const ContactItem: FC<ContactItemProps> = ({ contact, onUpdateModal, onDeleteModal }) => {
  const handleUpdateModal = () => {
    onUpdateModal(contact);
  };

  const handleDeleteModal = () => {
    onDeleteModal(contact);
  };

  return (
    <div className={styles.root}>
      <Typography variant="body" as="span">
        {contact.name}
      </Typography>
      <Typography variant="body" as="span">
        {contact.phone}
      </Typography>

      <div className={styles.container}>
        <Button variant="secondary" onClick={handleUpdateModal} className={styles.button}>
          <EditIcon />
        </Button>
        <Button variant="secondary" onClick={handleDeleteModal} className={styles.button}>
          <TrashIcon />
        </Button>
      </div>
    </div>
  );
};

export default ContactItem;
