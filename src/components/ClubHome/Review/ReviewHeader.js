import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import styles from '../../../styles/Club/Home/Review/ReviewHeader.module.scss';

const ReviewHeader = ({ reviewAvg, clubInfo }) => {
  return (
    <div className={styles.header}>
      <div>
        <span>{clubInfo.name}</span>
      </div>
      <div className={styles.star}>
        <AiFillStar />
        <span>{reviewAvg.toFixed(1)}</span>
      </div>
    </div>
  );
};

export default ReviewHeader;
