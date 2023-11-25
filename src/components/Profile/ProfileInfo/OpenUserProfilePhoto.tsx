import React from 'react';
import style from './ProfileInfo.module.css'
import profilePhoto from '../../../assets/images/user-icon.png'

interface OpenUserProfilePhotoProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  userProfilePhoto: string | undefined;
}

const OpenUserProfilePhoto: React.FC<OpenUserProfilePhotoProps> = ({ active, setActive, userProfilePhoto }) => {
  return (
    <div className={active ? `${style.userProfilePhotoContainer} ${style.active}` :
      style.userProfilePhotoContainer}
      onClick={() => setActive(false)}>
      <img className={active ? `${style.userProfilePhoto} ${style.active}` : style.userProfilePhoto}
        src={userProfilePhoto ? userProfilePhoto : profilePhoto} alt="photo-user-profile"
        onClick={e => e.stopPropagation()} />
    </div>
  );
};

export default OpenUserProfilePhoto;