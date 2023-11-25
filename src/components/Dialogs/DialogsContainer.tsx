import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectDialogs } from '../../redux/dialogsSlice';
import withoutAuthRedirect, { DialogsContainerProps } from '../hoc/withoutAuthRedirect';
import Dialogs from './Dialogs';

// interface DialogsContainerProps {
//   dialogs: { id: number; name: string }[];
// }

const DialogsContainer: FC<DialogsContainerProps> = () => {
  const dialogs = useSelector(selectDialogs);

  const DialogsWithoutAuthRedirect = withoutAuthRedirect(Dialogs);
  return (
    <DialogsWithoutAuthRedirect dialogs={dialogs} />
  )
};

export default DialogsContainer;