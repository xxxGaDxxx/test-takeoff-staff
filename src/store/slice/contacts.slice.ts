import { ContactType, SearchContactArgs, UpdateContactArgs } from '@/api/type.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '@/store/store.ts';
import { toast } from 'react-toastify';
import contactsApi from '@/api/contactsApi.ts';
import axios from 'axios';

interface InitialState {
  loading: boolean;
  contacts: ContactType[];
}

const initialState: InitialState = {
  loading: false,
  contacts: [],
};

const slice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<{ loading: boolean }>) {
      state.loading = action.payload.loading;
    },
    setDataContacts(state, action: PayloadAction<ContactType[]>) {
      state.contacts = action.payload;
    },
    removeContact(state, action: PayloadAction<{ contactId: number }>) {
      const index = state?.contacts?.findIndex(
        (contact) => contact.id === action.payload.contactId,
      );
      if (index > -1) {
        state?.contacts?.splice(index, 1);
      }
    },
    setUpdateContact(state, action: PayloadAction<ContactType>) {
      const index = state?.contacts?.findIndex((contact) => contact.id === action.payload.id);
      if (index !== -1 && state.contacts) {
        state.contacts[index] = action.payload;
      }
    },
  },
});

export const contactsReducer = slice.reducer;
export const { setDataContacts, setLoading, removeContact, setUpdateContact } = slice.actions;

export const getContacts = (): AppThunk => async (dispatch) => {
  dispatch(setLoading({ loading: true }));
  const userId = sessionStorage.getItem('userId');
  const accessToken = sessionStorage.getItem('accessToken');

  if (userId && accessToken) {
    try {
      const { data } = await contactsApi.getContacts({
        userId: Number(userId),
        accessToken,
      });
      dispatch(setDataContacts(data));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err?.response?.data);
      }
    }
  }
  dispatch(setLoading({ loading: false }));
};

export const deleteContact =
  (contactId: number): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading({ loading: true }));
    const accessToken = sessionStorage.getItem('accessToken');

    if (accessToken) {
      try {
        const res = await contactsApi.deleteContact({
          contactId,
          accessToken,
        });
        if (res.status === 200) {
          dispatch(removeContact({ contactId }));
          toast.success('Removal was successful');
        } else {
          toast.error('Whoops, something went wrong.');
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          toast.error(err?.response?.data);
        }
      }
    }
    dispatch(setLoading({ loading: false }));
  };

export const updateContacts =
  (params: Omit<UpdateContactArgs, 'accessToken'>): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading({ loading: true }));
    const accessToken = sessionStorage.getItem('accessToken');

    if (accessToken) {
      try {
        const { data } = await contactsApi.updateContacts({
          ...params,
          accessToken,
        });
        if (data) {
          dispatch(setUpdateContact(data));
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          toast.error(err?.response?.data);
        }
      }
    }
    dispatch(setLoading({ loading: false }));
  };

export const addContacts =
  (params: Omit<ContactType, 'id'>): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading({ loading: true }));
    const accessToken = sessionStorage.getItem('accessToken');

    if (accessToken) {
      try {
        const { data } = await contactsApi.addContacts({
          ...params,
          accessToken,
        });
        if (data) {
          toast.success('Yay, you added a new contact');
          dispatch(getContacts());
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          toast.error(err?.response?.data);
        }
      }
    }
    dispatch(setLoading({ loading: false }));
  };

export const searchContact =
  (params: Omit<SearchContactArgs, 'accessToken'>): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading({ loading: true }));
    const accessToken = sessionStorage.getItem('accessToken');

    if (accessToken) {
      try {
        const { data } = await contactsApi.searchContact({
          ...params,
          accessToken,
        });
        dispatch(setDataContacts(data));
      } catch (err) {
        if (axios.isAxiosError(err)) {
          toast.error(err?.response?.data);
        }
      }
    }
    dispatch(setLoading({ loading: false }));
  };
