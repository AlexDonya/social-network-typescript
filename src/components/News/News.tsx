import { FC } from 'react';
import style from './News.module.css';

const News: FC = () => {
  return (
    <div className={style.news}>
      <h1>News</h1>
      <div>
        It is typescript component
      </div>
    </div>
  );
};

export default News;    