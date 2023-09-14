import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store.ts';
import {
  addContacts,
  deleteContact,
  getContacts,
  searchContact,
  updateContacts,
} from '@/store/slice/contacts.slice.ts';
import Contacts from '@/components/contacts/Contacts.tsx';
import { Typography } from '@/components/ui-toolkit/typography/Typography.tsx';
import { ContactType } from '@/api/type.ts';
import EditOrAddModal from '@/components/contactModal/EditOrAddModal.tsx';
import { Button } from '@/components/ui-toolkit/button/Button.tsx';
import { ModalArgs } from '@/components/contactModal/schemaModalForm.ts';
import Search from '@/components/search/Search.tsx';
import styles from './ContactsPage.module.scss';

const ContactsPage = () => {
  const contacts = useAppSelector((state) => state.contacts.contacts);
  const userId = useAppSelector((state) => state.auth.user?.id);
  const isLoading = useAppSelector((state) => state.contacts.loading);
  const dispatch = useAppDispatch();

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  const onOpenAddModal = () => {
    setIsOpenAddModal(true);
  };

  const addContact = async (data: ModalArgs) => {
    if (userId) {
      dispatch(addContacts({ userId, ...data }));
    }
  };
  const onUpdateContact = (contact: ContactType) => {
    dispatch(updateContacts({ contactId: contact.id, name: contact.name, phone: contact.phone }));
  };
  const onDeleteContact = (contactId: number) => {
    dispatch(deleteContact(contactId));
  };

  const onSearchValue = (value: string) => {
    if (value && userId) {
      dispatch(searchContact({ search: value, userId }));
      return;
    }
    dispatch(getContacts());
  };

  return (
    <div>
      <div className={styles.container}>
        <Button variant="primary" onClick={onOpenAddModal} fullWidth>
          Add Contact
        </Button>

        <Search onSearchValue={onSearchValue} />
      </div>
      {contacts.length ? (
        <Contacts
          contacts={contacts}
          isLoading={isLoading}
          onUpdateContact={onUpdateContact}
          onDeleteContact={onDeleteContact}
        />
      ) : (
        <div>
          <Typography variant="h2" as="h2">
            You have no contacts, so add
          </Typography>
        </div>
      )}

      <EditOrAddModal
        isOpen={isOpenAddModal}
        titleModal="Update contact"
        isLoading={isLoading}
        onOpenChange={setIsOpenAddModal}
        onSubmit={addContact}
      />
    </div>
  );
};

export default ContactsPage;
