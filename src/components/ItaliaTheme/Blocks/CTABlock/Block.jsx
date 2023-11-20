import { Button, Container } from 'design-react-kit';
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import Image from '@plone/volto/components/theme/Image/Image';
import PropTypes from 'prop-types';
import { TextEditorWidget } from 'design-comuni-plone-theme/components/ItaliaTheme';
import { UniversalLink } from '@plone/volto/components';
import { TextBlockView } from '@plone/volto-slate/blocks/Text';
import { useHandleDetachedBlockFocus } from 'design-comuni-plone-theme/helpers/blocks';

import cx from 'classnames';

const messages = defineMessages({
  cta_title: {
    id: 'Type the title…',
    defaultMessage: 'Type the title…',
  },
  cta_content: {
    id: 'Type description…',
    defaultMessage: 'Digita la descrizione…',
  },
  openLinkInNewTab: {
    id: 'openLinkInNewTab',
    defaultMessage: 'Apri link in una nuova scheda',
  },
});

const Block = (props) => {
  const { data, block, inEditMode, selected, ...otherProps } = props;
  const intl = useIntl();
  const title = data?.cta_title;
  const hasImage = data?.showImage && data?.ctaImage?.length > 0;
  const content = data?.cta_content;
  const showFullwidth = data?.showFullWidth;

  const { selectedField, setSelectedField } = useHandleDetachedBlockFocus(
    props,
    'cta_title',
  );

  return (
    <div
      className={cx('cta-block-wrapper', {
        'has-image': hasImage,
        'full-width': showFullwidth,
      })}
    >
      {hasImage && data?.ctaImage?.length > 0 && (
        <Image
          itemUrl={data.ctaImage[0]['@id']}
          image={
            data.ctaImage[0].image_scales?.[
              data.ctaImage[0].image_field
            ]?.[0] || data.ctaImage[0]['@id']
          }
          key={data.ctaImage[0]['@id']}
          alt=""
          aria-hidden="true"
          loading="lazy"
          useOriginal={false}
          role="presentation"
        />
      )}
      <Container tag="div" className="px-3 px-md-4">
        <div className="cta-tile-text">
          <h2 className="title mt-0" id={block + 'title'}>
            {inEditMode ? (
              <TextEditorWidget
                {...otherProps}
                showToolbar={false}
                data={data}
                fieldName="cta_title"
                selected={selectedField === 'cta_title'}
                setSelected={setSelectedField}
                block={block}
                placeholder={intl.formatMessage(messages.cta_title)}
                focusNextField={() => {
                  setSelectedField('cta_content');
                }}
              />
            ) : (
              title
            )}
          </h2>

          {inEditMode ? (
            <TextEditorWidget
              {...otherProps}
              showToolbar={true}
              data={data}
              fieldName="cta_content"
              block={block}
              selected={selectedField === 'cta_content'}
              placeholder={intl.formatMessage(messages.cta_content)}
              setSelected={setSelectedField}
              focusPrevField={() => {
                setSelectedField('cta_title');
              }}
            />
          ) : (
            <TextBlockView data={{ value: content }} />
          )}
          {data.ctaLink?.length > 0 && data.ctaLinkTitle?.length > 0 && (
            <div className="mt-5">
              <Button
                color="info"
                icon={false}
                size="lg"
                outline
                tag={UniversalLink}
                disabled={inEditMode}
                href={data.ctaLink}
                openLinkInNewTab={!!data.openLinkInNewTab}
                title={
                  !!data.openLinkInNewTab
                    ? intl.formatMessage(messages.openLinkInNewTab)
                    : null
                }
              >
                {data.ctaLinkTitle}
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

Block.propTypes = {
  entityMap: PropTypes.any,
  title: PropTypes.string,
  content: PropTypes.any,
};

export default Block;
