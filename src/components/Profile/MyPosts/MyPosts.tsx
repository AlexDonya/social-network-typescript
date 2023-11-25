import { ChangeEvent, FC } from 'react';
import style from './MyPosts.module.css'
import Preloader from '../../common/Preloader';
import profilePhoto from '../../../assets/images/user-icon.png'

interface Post {
  id: number;
  message: string;
  likes: number;
}

interface MyPostsProps {
  newPostText: string;
  posts: Post[];
  handleUpdateNewPostText: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleAddPost: () => void;
  profile?: {
    photos: {
      large?: string | null;
    } | null;
  } | null;
}

const MyPosts: FC<MyPostsProps> = ({ newPostText, posts, handleUpdateNewPostText,
  handleAddPost, profile }) => {
  return (
    <div>
      <h3>My posts</h3>
      <div>
        <div className={style.textareaBtnBlock}>
          <textarea value={newPostText} onChange={handleUpdateNewPostText} />
          <button className={style.btn} onClick={handleAddPost}>Add post</button>
        </div>
      </div>
      <div className={style.posts}>
        {posts.map(post => <div className={style.post} key={post.id}>
          <div className={style.photoUserProfileContainer}>
            {profile === null ? < Preloader /> :
              <img className={style.photoUserProfile}
                src={profile?.photos?.large ? profile?.photos?.large : profilePhoto}
                alt="photo-user-profile" />}
          </div>
          <div className={style.postMessage}>
            <span>{post.message}</span>
          </div>
          <div className={style.postLikes}>
            <span>
              <span className={style.heartSymbol}>❤️</span> {post?.likes} likes
            </span>
          </div>
        </div>)}
      </div>
    </div>
  );
};

export default MyPosts;