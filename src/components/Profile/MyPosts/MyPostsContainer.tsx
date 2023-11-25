import { ChangeEvent, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, selectNewPostText, selectPosts, updateNewPostText } from '../../../redux/profileSlice.ts';
import MyPosts from './MyPosts.tsx';
import { UserProfileType } from '../../../types/types.ts';
import { AppDispatch, RootState } from '../../../redux/store.ts';

interface MyPostsContainerProps {
  profile?: UserProfileType | null;
}

const MyPostsContainer: FC<MyPostsContainerProps> = ({ profile }) => {
  const dispatch: AppDispatch = useDispatch();
  const newPostText = useSelector((state: RootState) => selectNewPostText(state));
  const posts = useSelector((state: RootState) => selectPosts(state));

  const handleAddPost = () => {
    dispatch(addPost());
  }

  const handleUpdateNewPostText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateNewPostText(e.target.value));
  }

  return <MyPosts profile={profile} newPostText={newPostText}
    posts={posts} handleAddPost={handleAddPost}
    handleUpdateNewPostText={handleUpdateNewPostText} />
};

export default MyPostsContainer;