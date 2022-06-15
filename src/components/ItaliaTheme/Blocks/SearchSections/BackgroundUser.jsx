import React from 'react';

const Background = (props) => (
  <div
    className="searchSections-background"
    style={{
      backgroundImage: 'url(' + props?.image?.image?.huge?.download,
    }}
  />
);

export default Background;
