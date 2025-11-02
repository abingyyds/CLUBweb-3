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
        <div className={styles.frame14360}>
          <div className={styles.button}>
            <p className={styles.cancel}>Cancel</p>
            <img
              src="../image/mhhg4cih-8fgld7a.svg"
              className={styles.iconChevronsRight}
            />
          </div>
          <div className={styles.button}>
            <p className={styles.cancel}>Confirm</p>
            <img
              src="../image/mhhg4cih-8fgld7a.svg"
              className={styles.iconChevronsRight}
            />
          </div>
        </div>
      </div>
      <img src="../image/mhhg4cih-liqhj1c.svg" className={styles.frame} />
    </div>
  );
}

export default Component;
