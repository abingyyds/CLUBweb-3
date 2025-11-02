import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.frame12}>
      <div className={styles.frame6}>
        <div className={styles.frame14380}>
          <p className={styles.alert}>Alert</p>
          <img src="../image/mhhgk2a1-gexkn3r.svg" className={styles.frame} />
        </div>
      </div>
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
        <div className={styles.frame14391}>
          <div className={styles.frame11}>
            <p className={styles.cancel}>Cancel</p>
          </div>
          <div className={styles.frame11}>
            <p className={styles.cancel}>Confirm</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
