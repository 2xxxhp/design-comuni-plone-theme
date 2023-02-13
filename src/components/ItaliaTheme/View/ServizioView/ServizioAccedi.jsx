import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import { UniversalLink } from '@plone/volto/components';
import {
  RichText,
  RichTextSection,
  richTextHasContent,
  OfficeCard,
} from 'design-comuni-plone-theme/components/ItaliaTheme/View';

const ServizioAccedi = ({ content }) => {
  const intl = useIntl();

  return (
    <>
      {(richTextHasContent(content.canale_digitale) ||
        content.canale_digitale_link ||
        richTextHasContent(content.prenota_appuntamento) ||
        content.canale_fisico?.length > 0) && (
        <RichTextSection
          content={content.canale_digitale}
          tag_id="submit-request"
          title={intl.formatMessage(messages.canale_digitale)}
          hasBg
          p="4"
        >
          {content.canale_digitale_link && (
            <div className="mb-4">
              <p className="draftjs-buttons">
                <UniversalLink href={content.canale_digitale_link}>
                  {intl.formatMessage(messages.canale_digitale_link)}
                </UniversalLink>
              </p>
            </div>
          )}
          <RichText content={content.prenota_appuntamento} />
          {content.canale_fisico?.map?.((canale) => (
            <OfficeCard key={canale['@id']} office={canale} load_data={false} />
          ))}
        </RichTextSection>
      )}
      {(content.dove_rivolgersi?.length > 0 ||
        richTextHasContent(content.dove_rivolgersi_extra)) && (
        <RichTextSection title={intl.formatMessage(messages.dove_rivolgersi)}>
          {content.dove_rivolgersi?.map?.((dove) => (
            <div
              key={dove['@id']}
              className="card-wrapper card-teaser-wrapper card-teaser-wrapper-equal"
            >
              <OfficeCard office={dove} load_data={false} />
            </div>
          ))}
          <RichText content={content.dove_rivolgersi_extra} />
        </RichTextSection>
      )}
    </>
  );
};

ServizioAccedi.propTypes = {
  content: PropTypes.shape({
    canale_digitale: PropTypes.object,
  }),
};

export default ServizioAccedi;

const messages = defineMessages({
  canale_digitale: {
    id: 'servizio_canale_digitale',
    defaultMessage: 'Accedi al servizio',
  },
  canale_digitale_link: {
    id: 'servizio_canale_digitale_link',
    defaultMessage: 'Accedi al servizio',
  },
  prenota_appuntamento: {
    id: 'servizio_prenota_appuntamento',
    defaultMessage: 'Prenota appuntamento',
  },
  dove_rivolgersi: {
    id: 'servizio_dove_rivolgersi',
    defaultMessage: 'Dove rivolgersi',
  },
});
