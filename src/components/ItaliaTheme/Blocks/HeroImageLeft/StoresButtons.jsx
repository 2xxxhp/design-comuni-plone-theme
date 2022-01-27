import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'design-react-kit/dist/design-react-kit';

import { Icon } from '@italia/components/ItaliaTheme';
import { UniversalLink } from '@plone/volto/components';
import { CardReadMore } from 'design-react-kit/dist/design-react-kit';
import { flattenToAppURL } from '@plone/volto/helpers';

const StoresButtons = ({ data }) => (
  <div className="stores-buttons">
    <div className="buttons">
      {data.playStoreLink && (
        <Button tag={UniversalLink} href={data.playStoreLink} color="primary">
          <span>PLAY STORE</span>
          <Icon icon="fab google-play" />
        </Button>
      )}

      {data.appStoreLink && (
        <Button tag={UniversalLink} href={data.appStoreLink} color="primary">
          <span>APP STORE</span>
          <Icon icon="fab apple" />
        </Button>
      )}
    </div>

    {data.moreHref && (
      <CardReadMore
        tag={UniversalLink}
        iconName="it-arrow-right"
        text={data.moreTitle || 'Link ad altro'}
        href={flattenToAppURL(data.moreHref)}
      />
    )}
  </div>
);

StoresButtons.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default StoresButtons;
