/**
 * ScrollToTop component.
 * @module components/ScrollToTop/ScrollToTop
 */

import React, { useState, useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Icon, Button } from 'design-react-kit/dist/design-react-kit';

const messages = defineMessages({
  scrollToTop: {
    id: 'Scroll to top',
    defaultMessage: 'Torna su',
  },
});

const ScrollToTop = () => {
  const intl = useIntl();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
      {isVisible && (
        <Button
          className="scroll-to-top"
          color="tertiary"
          tag="button"
          size="sm"
          title={intl.formatMessage(messages.scrollToTop)}
          onClick={scrollToTop}
        >
          <Icon icon="it-arrow-up" padding={false} size="sm" />
        </Button>
      )}
    </>
  );
};

export default ScrollToTop;
