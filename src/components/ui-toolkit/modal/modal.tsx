import { ComponentProps, FC, ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Typography } from '@/components/ui-toolkit/typography/Typography.tsx';
import CloseIcon from '@/assets/icons/CloseIcon.tsx';
import styles from './modal.module.scss';

export type ModalType = {
  children?: ReactNode;
  title?: string;
  onOpenChange?: (value: boolean) => void;
  isOpen: boolean;
} & ComponentProps<'div'>;

export const Modal: FC<ModalType> = ({ children, title, onOpenChange, isOpen }) => (
  <Dialog.Root onOpenChange={onOpenChange} open={isOpen}>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.dialogOverlay} />
      <Dialog.Content className={styles.dialogContent}>
        <div className={styles.header}>
          <Dialog.Title>
            <Typography variant="h2">{title}</Typography>
          </Dialog.Title>
          <Dialog.Close className={styles.iconButton} aria-label="Close">
            <CloseIcon />
          </Dialog.Close>
        </div>
        <div className={styles.content}>{children}</div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
