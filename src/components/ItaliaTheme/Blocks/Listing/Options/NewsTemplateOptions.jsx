import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  SelectWidget,
  CheckboxWidget,
  TextWidget,
} from '@plone/volto/components';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  title: {
    id: 'Titolo',
    defaultMessage: 'Titolo',
  },

  show_block_bg: {
    id: 'Mostra lo sfondo del blocco',
    defaultMessage: 'Mostra lo sfondo del blocco',
  },
});

const NewsTemplateOptions = ({
  data,
  block,
  onChangeBlock,
  required = false,
}) => {
  const intl = useIntl();

  return (
    <>
      <TextWidget
        id="title"
        title={intl.formatMessage(messages.title)}
        required={false}
        value={data.title}
        onChange={(name, value) => {
          onChangeBlock(block, {
            ...data,
            [name]: value,
          });
        }}
      />

      <CheckboxWidget
        id="show_block_bg"
        title={intl.formatMessage(messages.show_block_bg)}
        value={data.show_block_bg ? data.show_block_bg : false}
        onChange={(id, value) => {
          onChangeBlock(block, {
            ...data,
            [id]: value,
          });
        }}
      />
    </>
  );
};

NewsTemplateOptions.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default NewsTemplateOptions;
