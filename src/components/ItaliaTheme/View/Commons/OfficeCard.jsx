import { useIntl, defineMessages } from 'react-intl';
import { UniversalLink } from '@plone/volto/components';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Icon } from 'design-comuni-plone-theme/components/ItaliaTheme';
import { ContactLink } from 'design-comuni-plone-theme/components/ItaliaTheme/View';
import config from '@plone/volto/registry';

/**
 * OfficeCard view component class.
 * @function OfficeCard
 * @params {object} content: Content object.
 * @returns {string} Markup of the component.
 */
const OfficeCard = ({
  office,
  icon,
  children,
  margin_bottom = false,
  show_contacts = true,
  showimage = true,
  size,
  no_details = false,
  ...rest
}) => {
  const intl = useIntl();
  const Image = config.getComponent({ name: 'Image' }).component;
  const image =
    showimage && Image({ item: office, sizes: '80px', loading: 'lazy' });

  return (
    <div
      className={cx(
        'card card-teaser office-card preview-image-card border-left-card rounded shadow p-3 ',
        size === 'big' ? 'card-big-io-comune' : 'card-small',
        {
          'mb-3': margin_bottom,
        },
      )}
      {...rest}
    >
      {icon && (
        <Icon
          icon={icon}
          altText={intl.formatMessage(messages.icona_ufficio)}
        ></Icon>
      )}
      <div className="card-body pe-3">
        <div className="card-title h5">
          <UniversalLink
            item={office}
            title={office.title}
            data-element="service-area"
          >
            {office.title}
          </UniversalLink>
        </div>
        <p className="card-text">{office.description}</p>
        {show_contacts && office?.sede?.length > 0 && (
          <div>
            {' '}
            {office?.sede?.map((sede, i) => {
              return (
                <div className="card-text" key={i}>
                  {sede.street && <p>{sede.street}</p>}
                  {(sede.city || sede.zip_code) && (
                    <p>
                      {sede.zip_code} {sede.city}
                    </p>
                  )}
                  {office?.contact_info?.map((el) =>
                    el?.value_punto_contatto?.map((pdc, i) => {
                      if (pdc.pdc_type === 'telefono') {
                        return (
                          <div key={i}>
                            <ContactLink tel={pdc.pdc_value} label={false} />
                          </div>
                        );
                      } else if (
                        pdc.pdc_type === 'email' ||
                        pdc.pdc_type === 'pec'
                      )
                        return (
                          <div key={i}>
                            <ContactLink email={pdc.pdc_value} label={false} />
                          </div>
                        );
                      return null;
                    }),
                  )}
                </div>
              );
            })}
          </div>
        )}

        {children && <div className="card-text">{children}</div>}
      </div>
      {image && <div className="image-container">{image}</div>}
    </div>
  );
};
export default OfficeCard;

OfficeCard.propTypes = {
  office: PropTypes.shape({
    '@id': PropTypes.string,
    '@type': PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string,
    review_state: PropTypes.string,
  }),
  icon: PropTypes.string,
};

const messages = defineMessages({
  icona_ufficio: {
    id: 'icona_ufficio',
    defaultMessage: 'Icona ufficio',
  },
});
