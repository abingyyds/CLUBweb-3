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
        <div className={styles.frame14368}>
          <div className={styles.frame11}>
            <p className={styles.cancel}>Cancel</p>
          </div>
          <div className={styles.frame12}>
            <p className={styles.confirm}>Confirm</p>
          </div>
        </div>
      </div>
      <img src="../image/mhhgp95s-sljrlhn.svg" className={styles.frame} />
    </div>
  );
}

export default Component;
