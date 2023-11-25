import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, getUserStatus, selectUserProfile } from '../../redux/profileSlice.ts';
import { useParams } from 'react-router-dom';
import withoutAuthRedirect from '../hoc/withoutAuthRedirect.tsx';
import { AppDispatch, RootState } from '../../redux/store.ts';
import { UserProfileType } from '../../types/types.ts';
import Profile from './Profile';

// interface RouteParams {
//     userId?: string;
// }

const ProfileContainer: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const userProfile: UserProfileType | null = useSelector((state: RootState) => selectUserProfile(state));
  const params = useParams<{ userId?: string }>();

  useEffect(() => {
    let userId = parseInt(params.userId || '');
    if (!userId) {
      userId = 1079;
    }

    dispatch(getUserProfile(userId));
    dispatch(getUserStatus(userId));
  }, [dispatch, params.userId]);

  const WrappedProfile = withoutAuthRedirect(Profile);

  return (
    // withoutAuthRedirect(
    //     <Profile profile={userProfile} />
    // )
    <WrappedProfile profile={userProfile} />
  )
};

export default ProfileContainer;