import { SubmitHandler } from 'react-hook-form';
import { ModalArgs } from '@/components/contactModal/schemaModalForm.ts';

interface Modals {
  isOpen: boolean;
  titleModal: string;
  isLoading: boolean;
  onOpenChange: (value: boolean) => void;
}

export interface DeleteContactModalProps extends Modals {
  name: string;
  phone: string;
  onDelete: () => void;
}

export interface EditOrAddModalProps extends Modals {
  name?: string;
  phone?: string;
  onSubmit: SubmitHandler<ModalArgs>;
}
