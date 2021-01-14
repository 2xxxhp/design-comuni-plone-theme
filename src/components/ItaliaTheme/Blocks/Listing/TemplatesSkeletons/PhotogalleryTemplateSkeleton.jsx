import React from 'react';
import PropTypes from 'prop-types';
import PhotogalleryTemplate from '@italia/components/ItaliaTheme/Blocks/Listing/PhotogalleryTemplate';

const PhotogalleryTemplateSkeleton = (data) => {
  let items = [];
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((i) => {
    items.push({ '@id': i });
  });
  return (
    <div className="public-ui ">
      <div className="skeleton-template">
        <PhotogalleryTemplate {...data} items={items} />
      </div>
    </div>
  );
};

PhotogalleryTemplateSkeleton.propTypes = {
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
  title: PropTypes.string,
};

export default PhotogalleryTemplateSkeleton;
