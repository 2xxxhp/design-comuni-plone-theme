import React from 'react';
import cx from 'classnames';

const BodyWrapper = ({ inEditMode, children }) => {
  return (
    <div
      className={cx('block simple-text-block', {
        'public-ui': inEditMode,
      })}
    >
      {children}
    </div>
  );
};
export default BodyWrapper;
