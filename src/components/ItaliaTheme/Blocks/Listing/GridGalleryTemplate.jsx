import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { UniversalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import { useIntl, defineMessages } from 'react-intl';
import { ListingLinkMore, ListingImage } from '@italia/components/ItaliaTheme';
import {
  Container,
  Row,
  Col,
  Alert,
} from 'design-react-kit/dist/design-react-kit';

const messages = defineMessages({
  maxItemsExceeded: {
    id: 'grid-gallery-max-items-exceeded',
    defaultMessage:
      'Per questo template il numero di risultati per pagina deve essere 7. Controlla le impostazioni.',
  },
});

const GridGalleryTemplate = ({
  items,
  isEditMode,
  title,
  linkTitle,
  linkHref,
  show_block_bg,
}) => {
  const intl = useIntl();

  return (
    <div className="grid-gallery-template">
      <Container className="px-4">
        {title && (
          <Row>
            <Col>
              <h2 className="mb-4">{title}</h2>
            </Col>
          </Row>
        )}

        {isEditMode && items.length > 7 && (
          <Alert color="danger">
            {intl.formatMessage(messages.maxItemsExceeded)}
          </Alert>
        )}
        <div className="grid-gallery-grid">
          {items.map((item, index) => {
            let image = ListingImage({
              item,
              useOriginal: false,
              className: '',
            });

            let scale = null;
            if (index % 7 === 0 || index % 7 === 6) {
              scale = 'great';
            }
            if (index % 7 === 1 || index % 7 === 5) {
              scale = 'teaser';
            }
            if (index % 7 === 2 || index % 7 === 4) {
              scale = 'large';
            }

            if (scale) {
              image = (
                <picture class="volto-image responsive">
                  <img
                    src={flattenToAppURL(
                      item['@id'] +
                        '/@@images/' +
                        (item.image_field ?? 'image') +
                        '/' +
                        scale,
                    )}
                    alt={item.title}
                    role="presentation"
                    aria-hidden="true"
                    title={item.title}
                  />
                </picture>
              );
            }

            return (
              <div
                key={item['@id'] ?? index}
                className={cx('grid-gallery-item', `item-${index % 7}`)}
              >
                <UniversalLink
                  item={!isEditMode ? item : null}
                  href={isEditMode ? '#' : null}
                >
                  {image && image}
                  <h3>{item.title}</h3>
                </UniversalLink>
              </div>
            );
          })}
        </div>
        <ListingLinkMore title={linkTitle} href={linkHref} className="my-5" />
      </Container>
    </div>
  );
};

GridGalleryTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkTitle: PropTypes.any,
  linkHref: PropTypes.any,
  isEditMode: PropTypes.bool,
  title: PropTypes.string,
};

export default GridGalleryTemplate;
