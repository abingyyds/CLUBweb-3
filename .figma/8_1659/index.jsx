import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.header}>
      <div className={styles.frame7}>
        <p className={styles.abcWeb3Club}>abc.web3.club</p>
        <img
          src="../image/mgmboitz-rxe7hnr.svg"
          className={styles.arrowRightCircleFill}
        />
      </div>
      <p className={styles.poweredByWeb3ClubAnd3}>
        <span className={styles.poweredByWeb3ClubAnd}>Powered by&nbsp;</span>
        <span className={styles.poweredByWeb3ClubAnd2}>Web3.Club</span>
        <span className={styles.poweredByWeb3ClubAnd}>&nbsp;and&nbsp;</span>
        <span className={styles.poweredByWeb3ClubAnd2}>OrbitLink.Me</span>
      </p>
    </div>
  );
}

export default Component;
