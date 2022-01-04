import React from 'react';
import styles from 'styles/Club/Home/Apply/ApplyHeader.module.scss';

const ApplyHeader = ({ clubName }) => {
  return (
    <div className={styles.header}>
      <h1>{clubName.info.result.clubInfo.name}</h1>
    </div>
  );
};

export default ApplyHeader;
