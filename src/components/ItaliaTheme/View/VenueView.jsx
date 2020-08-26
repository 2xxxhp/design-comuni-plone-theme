/**
 * NewsItemView view component.
 * @module components/theme/View/NewsItemView
 */

import React, { createRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import {
  SideMenu,
  PageHeader,
  WideImage,
  RichTextArticle,
  RelatedNewsArticle,
  ServicesArticle,
} from '@italia/components/ItaliaTheme/View';
import {
  Icon,
} from 'design-react-kit/dist/design-react-kit';
import { OSMMap } from '@italia/addons/volto-venue';
import {
  Card,
  CardBody,
  CardTitle,
  CardText
} from 'design-react-kit/dist/design-react-kit';
const messages = defineMessages({
  descrizione: {
    id: 'descrizione',
    defaultMessage: 'Descrizione',
  },
  modalita_accesso: {
    id: 'modalita_accesso',
    defaultMessage: 'Modalità di accesso',
  },
  quartiere: {
    id: 'quartiere',
    defaultMessage: 'Quartiere',
  },
  circoscrizione: {
    id: 'circoscrizione',
    defaultMessage: 'Circoscrizione',
  },
  dove: {
    id: 'dove',
    defaultMessage: 'Dove',
  },
  elementi_di_interesse: {
    id: 'elementi_di_interesse',
    defaultMessage: 'Elementi di interesse',
  },
  orario_pubblico: {
    id: 'orario_pubblico',
    defaultMessage: 'Orario al pubblico',
  },
  servizi_offerti: {
    id: 'servizi_offerti',
    defaultMessage: 'Servizi offerti',
  },
  sede_di: {
    id: 'sede_di',
    defaultMessage: 'Sede di',
  },
  uo_related_news: {
    id: 'uo_related_news',
    defaultMessage: 'Notizie in evidenza',
  },
  ulteriori_informazioni: {
    id: 'ulteriori_informazioni',
    defaultMessage: 'Ulteriori informazioni',
  }
});

/**
 * VenueView view component class.
 * @function VenueView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const VenueView = ({ content }) => {
  const intl = useIntl();
  let documentBody = createRef();
  const [sideMenuElements, setSideMenuElements] = useState(null);

  useEffect(() => {
    if (documentBody.current) {
      if (__CLIENT__) {
        setSideMenuElements(documentBody.current);
      }
    }
  }, [documentBody]);

  return (
    <>
      <div className="container px-4 my-4 luogo-view">
        <PageHeader
          content={content}
          readingtime={null}
          showreadingtime={false}
          imageinheader={true}
          imageinheader_field={'foto_persona'}
          showdates={false}
          showtassonomiaargomenti={true}
        />
          {(content?.image || content?.image_caption) && (
            <WideImage
              title={content?.title}
              image={content?.image}
              caption={content?.image_caption}
            />
          )}
        <div className="row border-top row-column-border row-column-menu-left">
          <aside className="col-lg-4">
            {__CLIENT__ && <SideMenu data={sideMenuElements} />}
          </aside>
          <section
            className="col-lg-8 it-page-sections-container"
            ref={documentBody}
          >
            {/* DESCRIZIONE COMPLETA */}
            {content.descrizione_completa && (
              <RichTextArticle
                content={content.descrizione_completa.data}
                tag_id={'description'}
                title={intl.formatMessage(messages.descrizione)}
              />
            )}

            {/* MODALITA DI ACCESSO */}
            {content.modalita_accesso && (
              <RichTextArticle
                content={content?.modalita_accesso?.data}
                tag_id={'modalita-accesso'}
                title={intl.formatMessage(messages.modalita_accesso)}
              />
            )}

            {/* QUARTIERE */}
            {content.quartiere && (
              <RichTextArticle
                content={content?.quartiere}
                tag_id={'quartiere'}
                title={intl.formatMessage(messages.quartiere)}
              />
            )}

            {/* CIRCOSCRIZIONE */}
            {content.circoscrizione && (
              <RichTextArticle
                content={content?.circoscrizione}
                tag_id={'circoscrizione'}
                title={intl.formatMessage(messages.circoscrizione)}
              />
            )}

            {/* MAPPA */}
            {content.geolocation && (
              <article
                id="luoghi"
                className="it-page-section anchor-offset mt-5"
              >
                <h4 id="header-luoghi">
                  {intl.formatMessage(messages.dove)}
                </h4>
                 <Card className="card card-teaser shadow mt-3 rounded mb-4">
                  <Icon icon={'it-pin'} />
                  <CardBody>
                    <CardTitle>
                      <h5 className="card-title">{content.title}</h5>
                    </CardTitle>
                    <CardText>
                      <p>{`${content.street || ''} - ${content.zip_code || ''}`}</p>
                    </CardText>
                  </CardBody>
                </Card>
                { __CLIENT__ && content?.geolocation?.latitude && content?.geolocation?.longitude &&
                  <OSMMap position={[content?.geolocation?.latitude, content?.geolocation?.longitude]} />
                }
              </article>
            )}

            {/* ELEMENTI DI INTERESSE */}
            {content.elementi_di_interesse && (
              <RichTextArticle
                content={content?.elementi_di_interesse?.data}
                tag_id={'elementi-di-interesse'}
                title={intl.formatMessage(messages.elementi_di_interesse)}
              />
            )}

            {/* ORARIO AL PUBBLICO */}
            {content.orario_pubblico && (
              <RichTextArticle
                content={content?.orario_pubblico?.data}
                tag_id={'orario-per-pubblico'}
                title={intl.formatMessage(messages.orario_pubblico)}
              />
            )}

            {/* SERVIZI CORRELATI */}
            {content.venue_services?.length > 0 && (
              <ServicesArticle
                services={content.venue_services}
                title={intl.formatMessage(messages.servizi_offerti)}
              />
            )}

            {/* NEWS CORRELATE */}
            {content.related_news?.length > 0 && (
              <RelatedNewsArticle 
                news={content.related_news}
                title={intl.formatMessage(messages.uo_related_news)}
              />
            )}

            {/* ULTERIORI INFORMAZIONI */}
            {content.ulteriori_informazioni && (
              <RichTextArticle
                content={content?.ulteriori_informazioni?.data}
                tag_id={'ulteriori_informazioni'}
                title={intl.formatMessage(messages.ulteriori_informazioni)}
              />
            )}
          </section>
        </div>
      </div>
    </>
  );
};

VenueView.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    orario_pubblico: PropTypes.object,
    elementi_di_interesse: PropTypes.object,
    circoscrizione: PropTypes.string,
    quartiere: PropTypes.string,
    modalita_accesso: PropTypes.object,
    ulteriori_informazioni: PropTypes.shape({
      data: PropTypes.string,
    }),
  }).isRequired,
};

export default VenueView;
