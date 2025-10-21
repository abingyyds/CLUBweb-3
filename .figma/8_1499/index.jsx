import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.frame9}>
      <div className={styles.frame5}>
        <p className={styles.metaText}>meta text</p>
        <p className={styles.positionVerification}>Position Verification&nbsp;</p>
      </div>
      <div className={styles.frame13}>
        <div className={styles.textCell}>
          <img src="../image/mgkysdxn-70e74sc.svg" className={styles.frame52} />
          <div className={styles.frame14369}>
            <div className={styles.frame14356}>
              <p className={styles.eThChain}>ETH Chain</p>
              <p className={styles.holdAave100}>Hold AAVE ≥ 100</p>
            </div>
            <div className={styles.frame1}>
              <p className={styles.verify}>Verify</p>
              <img
                src="../image/mgkysdxn-bincd1p.svg"
                className={styles.arrowRightCircleFill}
              />
            </div>
          </div>
        </div>
        <div className={styles.autoWrapper}>
          <div className={styles.line1} />
        </div>
        <div className={styles.textCell2}>
          <div className={styles.frame53}>
            <img src="../image/mgkysdxn-xv9b9fq.svg" className={styles.bnb} />
          </div>
          <div className={styles.frame14369}>
            <div className={styles.frame14356}>
              <p className={styles.eThChain}>BNB Chain</p>
              <p className={styles.holdAave100}>Hold BNB ≥ 10</p>
            </div>
            <div className={styles.frame1}>
              <p className={styles.verify}>Verify</p>
              <img
                src="../image/mgkysdxn-9rfwl5p.svg"
                className={styles.arrowRightCircleFill}
              />
            </div>
          </div>
        </div>
        <div className={styles.autoWrapper}>
          <div className={styles.line1} />
        </div>
        <div className={styles.textCell3}>
          <div className={styles.frame54}>
            <img src="../image/mgkysdxn-04s5wqq.svg" className={styles.mAtic} />
          </div>
          <div className={styles.frame14369}>
            <div className={styles.frame14356}>
              <p className={styles.eThChain}>Polygon Chain</p>
              <p className={styles.holdAave100}>Hold MATIC ≥ 1000</p>
            </div>
            <div className={styles.frame1}>
              <p className={styles.verify}>Verify</p>
              <img
                src="../image/mgkysdxn-wh7jkix.svg"
                className={styles.arrowRightCircleFill}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
