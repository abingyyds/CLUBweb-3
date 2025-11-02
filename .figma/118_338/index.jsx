import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.frame9}>
      <p className={styles.alert}>Alert</p>
      <div className={styles.frame14369}>
        <p className={styles.youAlreadyHaveTheFol}>
          You already have the following access:
        </p>
        <p className={styles.monthlyMemberYearlyM}>
          Monthly Member
          <br />
          Yearly Member
          <br />
          Permanent Member
          <br />
          Token Holder
        </p>
        <p className={styles.doYouStillWantToJoin}>
          Do you still want to join this club again?
        </p>
        <div className={styles.frame3718}>
          <div className={styles.frame3716}>
            <p className={styles.cancel}>Cancel</p>
            <img
              src="../image/mhhgndyt-37rnbxn.svg"
              className={styles.chevronForward}
            />
          </div>
          <div className={styles.frame37162}>
            <p className={styles.confirm}>Confirm</p>
            <img
              src="../image/mhhgndyt-of2l80n.svg"
              className={styles.chevronForward}
            />
          </div>
        </div>
      </div>
      <img src="../image/mhhgndyt-j0zc4va.svg" className={styles.frame} />
    </div>
  );
}

export default Component;
