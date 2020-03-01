import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { useDispatch, useSelector } from 'react-redux';
import { injectIntl } from 'react-intl';
import Parser from 'rss-parser';
import moment from 'moment';
import { settings } from '@plone/volto/config';
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardCategory,
  CardReadMore,
} from 'design-react-kit/dist/design-react-kit';

const RssBody = ({ data, properties, intl, path, isEditMode }) => {
  const [feedItems, setFeedItems] = useState([]);
  moment.locale('it');
  useEffect(() => {
    let parser = new Parser();
    if (data?.feed?.length > 0) {
      let base_url = settings.apiPath;
      parser.parseURL(base_url + '/@get_rss_feed?feed=' + data.feed, function(
        err,
        feed,
      ) {
        if (err) throw err;
        setFeedItems(feed.items.slice(0, data?.feedItemNumber));
      });
    }
  }, [data]);
  return feedItems.length > 0 ? (
    <div className="row">
      {feedItems?.map((item, i) => (
        <div className="col-12 col-lg-3">
          <Card noWrapper={false} tag="div">
            <CardBody tag="div">
              <CardCategory date={moment(item.pubDate).format('DD-MMM-Y')}>
                {item.categories.length > 0 ? item.categories[0]._ : ''}
              </CardCategory>
              <CardTitle className="big-heading" tag="h5">
                {item.title}
              </CardTitle>
              <CardText tag="p" className="text-serif">
                {item.contentSnippet}
              </CardText>
            </CardBody>
            <CardReadMore
              iconName="it-arrow-right"
              tag="a"
              href={item?.link}
              text="Leggi di più"
            />
          </Card>
        </div>
      ))}
    </div>
  ) : (
    <div className="no-rss-feed-results" />
  );
};

RssBody.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  path: PropTypes.string.isRequired,
  isEditMode: PropTypes.bool,
};

export default injectIntl(RssBody);
