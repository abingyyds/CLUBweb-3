import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.frame12}>
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
                src="../image/mhhg7zcz-awo2dqe.svg"
                className={styles.chevronForward}
              />
            </div>
            <div className={styles.frame37162}>
              <p className={styles.confirm}>Confirm</p>
              <img
                src="../image/mhhg7zcz-v6ies4a.svg"
                className={styles.chevronForward}
              />
            </div>
          </div>
        </div>
        <img src="../image/mhhg7zcz-2otgjl4.svg" className={styles.frame} />
      </div>
    </div>
  );
}

export default Component;
