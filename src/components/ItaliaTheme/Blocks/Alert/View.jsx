/**
 * View Alert block.
 * @module components/manage/Blocks/Hero/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import redraft from 'redraft';
import { Container, Row, Col } from 'design-react-kit/dist/design-react-kit';
import { isCmsUi } from '@plone/volto/helpers';
import { settings } from '~/config';
import { flattenToAppURL } from '@plone/volto/helpers';
/**
 * View Alert block class.
 * @class View
 * @extends Component
 */
const View = ({ data, pathname }) => {
  if (__SERVER__) {
    return <div />;
  }
  const isCmsUI = pathname ? isCmsUi(pathname) : false;
  const generateKey = (pre) => {
    pre = pre ? pre : '';
    return pre + Math.random(5);
  };

  const content = data.text
    ? redraft(data.text, settings.ToHTMLRenderers, settings.ToHTMLOptions)
    : '';

  return (
    <section className="block alertblock" key={generateKey('alert')}>
      <Row className={cx('row-full-width', 'bg-alert-' + data.color)}>
        <Container className="p-4 pt-5 pb-5">
          <Row className="align-items-start">
            {data.image?.data && (
              <Col sm={2} className="pb-3 image-col">
                <img
                  src={`data:${data.image['content-type']};${data.image.encoding},${data.image.data}`}
                  alt=""
                  className="left-image"
                />
              </Col>
            )}
            <Col>{content}</Col>
          </Row>
        </Container>
      </Row>
    </section>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default React.memo(View);
