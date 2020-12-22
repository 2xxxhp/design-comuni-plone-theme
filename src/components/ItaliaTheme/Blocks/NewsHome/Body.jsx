import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { UniversalLink } from '@plone/volto/components';
import moment from 'moment';
import {
  Row,
  Col,
  Chip,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardReadMore,
} from 'design-react-kit/dist/design-react-kit';

import { flattenToAppURL } from '@plone/volto/helpers';
import { CardCategory } from '@italia/components/ItaliaTheme';

const Body = ({ content, pathname, block }) => {
  const intl = useIntl();
  moment.locale(intl.locale);
  return (
    <Row>
      {content.image && (
        <Col lg={{ size: 6, offset: 1, order: 2 }}>
          <img
            src={flattenToAppURL(content.image.scales.large.download)}
            title={content.title}
            alt={content.title}
            className="item-image"
          />
        </Col>
      )}
      <Col lg={{ size: 5, order: 1 }}>
        <Card>
          <CardBody className="pb-2">
            <CardCategory
              date={content.effective && moment(content.effective).format('ll')}
            >
              Notizie
            </CardCategory>
            <CardTitle tag="h2">
              <UniversalLink href={flattenToAppURL(content['@id'])}>
                {content.title}
              </UniversalLink>
            </CardTitle>
            <CardText>{content.description}</CardText>

            {content.tassonomia_argomenti &&
              content.tassonomia_argomenti.length > 0 && (
                <>
                  {content.tassonomia_argomenti.map((argomento) => (
                    <Chip simple color="primary" key={argomento['@id']}>
                      <UniversalLink
                        href={flattenToAppURL(argomento['@id'])}
                        className="chip-label text-decoration-none"
                      >
                        {argomento.title}
                      </UniversalLink>
                    </Chip>
                  ))}
                </>
              )}

            {block.moreHref && (
              <CardReadMore
                tag={Link}
                iconName="it-arrow-right"
                text={block.moreTitle || 'Vedi tutte le notizie'}
                to={flattenToAppURL(block.moreHref)}
              />
            )}
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Body.propTypes = {
  content: PropTypes.objectOf(PropTypes.any),
  pathname: PropTypes.string,
};

export default Body;
