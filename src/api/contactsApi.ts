import { instance } from '@/api/config.ts';
import {
  AddedContactArgs,
  ContactType,
  DeleteContactArgs,
  GetContactsArgs,
  SearchContactArgs,
  UpdateContactArgs,
} from '@/api/type.ts';

const contactsApi = {
  getContacts({ userId, accessToken }: GetContactsArgs) {
    return instance.get<ContactType[]>(`/contacts?userId=${userId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
  addContacts({ accessToken, ...restArgs }: AddedContactArgs) {
    return instance.post(
      '/contacts',
      { ...restArgs },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
  },
  deleteContact(params: DeleteContactArgs) {
    return instance.delete<ResponseType>(`contacts/${params.contactId}`, {
      headers: { Authorization: `Bearer ${params.accessToken}` },
    });
  },
  updateContacts({ contactId, accessToken, ...resArgs }: UpdateContactArgs) {
    return instance.patch(
      `contacts/${contactId}`,
      { ...resArgs },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
  },
  searchContact({ userId, search, accessToken }: SearchContactArgs) {
    return instance.get(`contacts?userId=${userId}&q=${search}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
};

export default contactsApi;
