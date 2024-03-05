/*
 * Slider
 */
import 'slick-carousel/slick/slick.css';
import 'design-comuni-plone-theme/components/slick-carousel/slick/slick-theme.css';
import { Col, Container, Row } from 'design-react-kit';
import {
  ListingImage,
  ListingLinkMore,
  SingleSlideWrapper,
  CarouselWrapper,
  ButtonPlayPause,
} from 'design-comuni-plone-theme/components/ItaliaTheme';
import { useSlider } from 'design-comuni-plone-theme/components/ItaliaTheme/Blocks/Listing/Commons/utils';
import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import config from '@plone/volto/registry';

const messages = defineMessages({
  viewImage: {
    id: 'viewImage',
    defaultMessage:
      'Sei attualmente in un carosello, per navigare usa le frecce sinistra e destra',
  },
  dots: {
    id: 'dots',
    defaultMessage: 'Navigazione elementi slider',
  },
  slideDot: {
    id: 'slideDot',
    defaultMessage: 'Vai alla slide {index}',
  },
});

const Slide = (props) => {
  const {
    item,
    index,
    nextIndex,
    prevIndex,
    appearance,
    appearanceProp,
    block_id,
  } = props;

  const handleKeyboardUsers = (e) => {
    const { key, shiftKey } = e;
    if (key === 'Tab') {
      e.preventDefault();
      e.stopPropagation();

      // Keeping auto pause off for now
      // if (userAutoplay) setUserAutoplay(false);
      // slider.current.slickPause();
      let elementToFocus;

      if (shiftKey) {
        elementToFocus =
          prevIndex != null
            ? document.querySelector(
                `#slider_${block_id} .slick-slide[data-index="${prevIndex}"]`,
              )
            : document.getElementById('sliderPrevArrow_' + block_id);
      } else
        elementToFocus =
          nextIndex != null
            ? document.querySelector(
                `#slider_${block_id} .slick-slide[data-index="${nextIndex}"]`,
              )
            : document.getElementById('sliderNextArrow_' + block_id);
      elementToFocus.focus();
    }
  };

  const appearances = config.blocks.blocksConfig.listing.variations.filter(
    (v) => v.id === 'slider',
  )[0]?.appearance;
  const SlideItemAppearance = appearances[appearance] ?? appearances['default'];

  return (
    <SingleSlideWrapper key={item['@id'] + index} index={index}>
      <div className={'slide-wrapper'}>
        <SlideItemAppearance
          {...props}
          {...appearanceProp}
          messages={messages}
          handleKeyboardUsers={handleKeyboardUsers}
        />
      </div>
    </SingleSlideWrapper>
  );
};

const SliderTemplate = ({
  items,
  title,
  isEditMode,
  show_block_bg,
  linkTitle,
  linkHref,
  slidesToShow = '1',
  full_width = false,
  show_image_title = true,
  show_dots = true,
  autoplay = false,
  autoplay_speed = 2, //seconds
  slide_appearance = 'default',
  reactSlick,
  block,
  ...otherProps
}) => {
  const block_id = block;
  const intl = useIntl();

  const [userAutoplay, setUserAutoplay] = useState(autoplay);
  const nSlidesToShow =
    items.length < parseInt(slidesToShow)
      ? items.length
      : parseInt(slidesToShow);
  const Slider = reactSlick.default;
  const { slider, focusNext, SliderNextArrow, SliderPrevArrow } = useSlider(
    userAutoplay,
    block_id,
  );

  const toggleAutoplay = () => {
    if (!slider?.current) return;
    if (userAutoplay) {
      setUserAutoplay(false);
      slider.current.slickPause();
    } else {
      setUserAutoplay(true);
      slider.current.slickPlay();
    }
  };

  const renderCustomDots = (props) => {
    // Custom handling of focus for a11y
    return (
      <ul
        className="slick-dots"
        aria-label={intl.formatMessage(messages.dots)}
        title={intl.formatMessage(messages.dots)}
      >
        {props.map((item, index) => {
          const El = item.type;
          const children = item.props.children;
          // Justified assumption: children is an Object and not an Array here
          const Child =
            children.type ||
            function () {
              return null;
            };
          return (
            <El
              className={`${item.props.className} slick-dot`}
              tabIndex={-1}
              title={intl.formatMessage(messages.slideDot, {
                index: index + 1,
              })}
              aria-hidden={true}
            >
              <Child
                {...children.props}
                tabIndex={-1}
                style={{ padding: 0 }}
                title={intl.formatMessage(messages.slideDot, {
                  index: index + 1,
                })}
                aria-label={intl.formatMessage(messages.slideDot, {
                  index: index + 1,
                })}
              />
            </El>
          );
        })}
      </ul>
    );
  };

  const settings = {
    dots: show_dots,
    infinite: true,
    autoplay: autoplay,
    speed: 500,
    slidesToShow: nSlidesToShow,
    slidesToScroll: nSlidesToShow,
    autoplaySpeed: autoplay_speed * 1000,
    pauseOnHover: true,
    pauseOnFocus: true,
    pauseOnDotsHover: true,
    swipe: true,
    swipeToSlide: true,
    focusOnSelect: false,
    draggable: true,
    accessibility: true,
    nextArrow: <SliderNextArrow intl={intl} focusNext={focusNext} />,
    prevArrow: <SliderPrevArrow intl={intl} focusNext={focusNext} />,
    appendDots: renderCustomDots,
    // Custom handling of focus for a11y
    afterChange: focusNext,
    responsive: [
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div
      className={cx(`sliderTemplate slidesToShow-${nSlidesToShow || 1}`, {
        'no-margin': full_width,
        ['appearance_' + slide_appearance]: slide_appearance,
      })}
      id={'slider_' + block_id}
    >
      <Container className="px-4">
        {title && (
          <Row>
            <Col>
              <h2 className="mb-4">{title}</h2>
            </Col>
          </Row>
        )}
        <div
          className={cx('slider-container', {
            'px-4 px-md-0': !full_width,
            'full-width': full_width,
          })}
        >
          <CarouselWrapper className="it-card-bg">
            {items?.length > nSlidesToShow && (
              <ButtonPlayPause onClick={toggleAutoplay} autoplay={userAutoplay}>
                <span>{userAutoplay ? 'pause' : 'play'}</span>
              </ButtonPlayPause>
            )}

            <Slider {...settings} ref={slider}>
              {items.map((item, index) => {
                const image = ListingImage({
                  item,
                  loading: index === 0 ? 'eager' : 'lazy',
                  sizes: `max-width(991px) 620px, ${1300 / nSlidesToShow}px`,
                  critical: true,
                });
                return (
                  <Slide
                    image={image}
                    index={index}
                    nextIndex={index + 1 === items.length ? null : index + 1}
                    prevIndex={index - 1 === -1 ? null : index - 1}
                    full_width={full_width}
                    item={item}
                    show_image_title={show_image_title}
                    intl={intl}
                    setUserAutoplay={setUserAutoplay}
                    userAutoplay={userAutoplay}
                    slider={slider}
                    appearance={slide_appearance}
                    appearanceProp={otherProps}
                    block_id={block_id}
                  />
                );
              })}
            </Slider>
          </CarouselWrapper>
        </div>
        <ListingLinkMore title={linkTitle} href={linkHref} className="my-4" />
      </Container>
    </div>
  );
};

SliderTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkTitle: PropTypes.any,
  linkHref: PropTypes.any,
  isEditMode: PropTypes.bool,
  title: PropTypes.string,
};

export default injectLazyLibs(['reactSlick'])(SliderTemplate);
