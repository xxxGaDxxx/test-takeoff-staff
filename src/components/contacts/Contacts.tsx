import { ContactType } from '@/api/type.ts';
import { FC, useState } from 'react';
import ContactItem from '@/components/contacts/elements/contactItem/ContactItem.tsx';
import DeleteModal from '@/components/contactModal/DeleteModal.tsx';
import EditOrAddModal from '@/components/contactModal/EditOrAddModal.tsx';
import { ModalArgs } from '@/components/contactModal/schemaModalForm.ts';

type ContactsProps = {
  contacts: ContactType[];
  isLoading: boolean;
  onUpdateContact: (contact: ContactType) => void;
  onDeleteContact: (contactId: number) => void;
};
const Contacts: FC<ContactsProps> = ({ onUpdateContact, onDeleteContact, contacts, isLoading }) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactType | null>();

  const onOpenUpdateModal = (contact: ContactType) => {
    setSelectedContact(contact);
    setIsOpenUpdateModal(true);
  };
  const onOpenDeleteModal = (contact: ContactType) => {
    setSelectedContact(contact);
    setIsOpenDeleteModal(true);
  };

  const handleDelete = () => {
    if (selectedContact) {
      onDeleteContact(selectedContact.id);
    }
  };

  const handleUpdate = (data: ModalArgs) => {
    if (selectedContact) {
      onUpdateContact({ ...selectedContact, ...data });
    }
  };

  return (
    <div>
      {contacts.map((contact) => (
        <ContactItem
          key={contact.userId + contact.phone}
          contact={contact}
          onUpdateModal={onOpenUpdateModal}
          onDeleteModal={onOpenDeleteModal}
        />
      ))}

      <DeleteModal
        name={selectedContact?.name || ''}
        phone={selectedContact?.phone || ''}
        onDelete={handleDelete}
        isOpen={isOpenDeleteModal}
        titleModal="Delete Contact"
        isLoading={isLoading}
        onOpenChange={setIsOpenDeleteModal}
      />

      <EditOrAddModal
        name={selectedContact?.name || ''}
        phone={selectedContact?.phone || ''}
        isOpen={isOpenUpdateModal}
        titleModal="Update contact"
        isLoading={isLoading}
        onOpenChange={setIsOpenUpdateModal}
        onSubmit={handleUpdate}
      />
    </div>
  );
};

export default Contacts;
