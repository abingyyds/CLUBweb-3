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
        <div className={styles.frame14374}>
          <div className={styles.frame7}>
            <p className={styles.cancel}>Cancel</p>
          </div>
          <div className={styles.frame8}>
            <p className={styles.cancel}>Confirm</p>
            <img
              src="../image/mhc2lub7-2gxh6c6.svg"
              className={styles.arrowRightCircleFill}
            />
          </div>
        </div>
      </div>
      <img src="../image/mhc2lub8-9wem51u.svg" className={styles.frame} />
    </div>
  );
}

export default Component;
