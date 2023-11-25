import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store.ts';
import { selectUserStatus, setUserStatus, updateUserStatus } from '../../../redux/profileSlice.ts';

interface ProfileStatusProps { }

const ProfileStatus: React.FC<ProfileStatusProps> = () => {
  const statusGlobalState = useSelector((state: RootState) => selectUserStatus(state));

  const dispatch: AppDispatch = useDispatch();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [status, setStatus] = useState<string>(statusGlobalState);

  const changeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  }

  const activateEditMode = () => {
    setEditMode(true);
  }

  const deactivateEditMode = () => {
    setEditMode(false);
    const updatedStatus: string = status || '';
    dispatch(setUserStatus(updatedStatus));
    dispatch(updateUserStatus(updatedStatus));
  }

  useEffect(() => {
    setStatus(statusGlobalState)
  }, [statusGlobalState]);

  return (
    <div>
      {!editMode &&
        <div>
          <span onDoubleClick={activateEditMode}>
            {status || '-----'}
          </span>
        </div>
      }
      {editMode &&
        <div>
          <input autoFocus={true}
            onBlur={deactivateEditMode}
            onChange={changeStatus}
            type="text"
            value={status || ''} />
        </div>
      }
    </div>
  );
};

export default ProfileStatus;