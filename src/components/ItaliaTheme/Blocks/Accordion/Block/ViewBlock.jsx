/**
 * ViewBlock.
 * @module components/ItaliaTheme/Blocks/Accordion/Block/ViewBlock
 */

import React from 'react';
import PropTypes from 'prop-types';
import redraft from 'redraft';
import { useIntl, defineMessages } from 'react-intl';
import cx from 'classnames';
import { settings } from '~/config';
import { Icon } from '@italia/components/ItaliaTheme';

const messages = defineMessages({
  vedi: {
    id: 'Vedi',
    defaultMessage: 'Vedi',
  },
});

/**
 * ViewBlock class.
 * @class ViewBlock
 * @extends Component
 */
const ViewBlock = ({ data, isOpen, toggle, id, index }) => {
  const intl = useIntl();
  return (
    <div className="accordion-item subblock-view">
      {data.title && (
        <h3 className="accordion-header" onClick={toggle()}>
          <button
            onClick={toggle()}
            aria-expanded={isOpen}
            aria-controls={`content-${id}-${index}`}
            id={`${id}-${index}`}
          >
            <Icon
              color="primary"
              icon={isOpen ? 'it-minus' : 'it-plus'}
              padding={false}
            />

            {redraft(
              data.title,
              settings.ToHTMLRenderers,
              settings.ToHTMLOptions,
            )}
          </button>
        </h3>
      )}

      {data.text && (
        <div
          className={cx('accordion-content', { open: isOpen })}
          id={`content-${id}-${index}`}
          role="region"
          aria-labelledby={`${id}-${index}`}
        >
          <div className="accordion-inner">
            {redraft(
              data.text,
              settings.ToHTMLRenderers,
              settings.ToHTMLOptions,
            )}
          </div>
          {data.href && (
            <div className="link-more">
              <a href={data.href}>
                {data.linkMoreTitle || intl.formatMessage(messages.vedi)}
                <Icon icon="it-arrow-right" />
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
ViewBlock.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ViewBlock;
