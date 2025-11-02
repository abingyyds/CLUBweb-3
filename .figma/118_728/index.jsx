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
        <div className={styles.frame39942}>
          <div className={styles.tag}>
            <p className={styles.cancel}>Cancel</p>
          </div>
          <div className={styles.tag}>
            <p className={styles.cancel}>Confirm</p>
          </div>
        </div>
      </div>
      <img src="../image/mhhg174v-7syf42g.svg" className={styles.frame} />
    </div>
  );
}

export default Component;
