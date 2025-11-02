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
        <div className={styles.frame6356126}>
          <div className={styles.btn}>
            <p className={styles.cancel}>Cancel</p>
          </div>
          <div className={styles.btn2}>
            <p className={styles.cancel}>Confirm</p>
            <img
              src="../image/mhhfh7k6-3spy30u.svg"
              className={styles.arrowRightLine}
            />
          </div>
        </div>
      </div>
      <img src="../image/mhhfh7k6-av5ofq8.svg" className={styles.frame} />
    </div>
  );
}

export default Component;
