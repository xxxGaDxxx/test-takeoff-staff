import { instance } from '@/api/config.ts';
import {
  AddedContactArgs,
  ContactType,
  DeleteContactArgs,
  GetContactsArgs,
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
  deleteContacts(params: DeleteContactArgs) {
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
};

export default contactsApi;
