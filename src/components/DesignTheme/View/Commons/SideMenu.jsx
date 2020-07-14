import { defineMessages, useIntl } from 'react-intl';
import React, { useEffect, useState } from 'react';
import { throttle } from 'lodash';

const messages = defineMessages({
  index: {
    id: 'index',
    defaultMessage: 'Indice della pagina',
  },
  contenuto: {
    id: 'Contenuto',
    defaultMessage: 'Contenuto',
  },
});

const extractHeaders = (elements, intl) => {
  let item;
  let headers = [];

  for (var index = 0; index < elements.length; index++) {
    item = elements[index];

    if (item.id === 'text-body') {
      headers.push({
        id: item.id,
        title: intl.formatMessage(messages.contenuto),
        item: item,
      });
    } else {
      let item_header = item.querySelector('#header-' + item.id);
      if (item_header) {
        headers.push({
          id: item.id,
          title: item_header.textContent,
          item: item,
        });
      }
    }
  }

  return headers;
};

/**
 * SideMenu view component class.
 * @function SideMenu
 * @params {object} content: Content object.
 * @returns {string} Markup of the component.
 */
const SideMenu = ({ data }) => {
  const intl = useIntl();

  const [headers, _setHeaders] = useState([]);
  const headersRef = React.useRef(headers);
  const setHeaders = (data) => {
    headersRef.current = data;
    _setHeaders(data);
  };

  const [activeSection, _setActiveSection] = useState(null);
  const activeSectionRef = React.useRef(activeSection);
  const setActiveSection = (data) => {
    activeSectionRef.current = data;
    _setActiveSection(data);
  };
  const [windowScrollY, setWindowScrollY] = useState(0);

  useEffect(() => {
    if (data?.children) {
      let extractedHeaders = extractHeaders(data.children, intl);
      setHeaders(extractedHeaders);
      setActiveSection(extractedHeaders[0].id);
      setWindowScrollY(window.scrollY);
    }
  }, [data]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = throttle(() => {
    let scrollDown = window.scrollY > windowScrollY;

    setWindowScrollY(window.scrollY);
    let scrollOffset = (scrollDown ? 0.15 : 0.85) * window.innerHeight;
    let headersHeights = headersRef.current
      .map((section) => {
        let element = document.getElementById(section.id);
        return {
          id: section.id,
          top: element.getBoundingClientRect().top,
        };
      })
      .filter((section) => section.top <= scrollOffset);

    if (headersHeights.length > 0) {
      let section = headersHeights.reduce(
        (prev, curr) => (prev.top > curr.top ? prev : curr),
        headersRef.current[0],
      );

      if (section.id !== activeSectionRef.current) {
        setActiveSection(section.id);
      }
    }
  }, 100);

  const handleClickAnchor = (id) => (e) => {
    e.preventDefault();

    document.getElementById(id).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return headers?.length > 0 ? (
    <div className="sticky-wrapper navbar-wrapper">
      <nav className="navbar it-navscroll-wrapper it-top-navscroll navbar-expand-lg">
        <button
          className="custom-navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          data-target="#navbarNav"
        >
          <span className="it-list"></span>
          {intl.formatMessage(messages.index)}
        </button>
        <div className="navbar-collapsable" id="navbarNav">
          <div className="overlay"></div>
          <div className="close-div sr-only">
            <button className="btn close-menu" type="button">
              <span className="it-close"></span>Chiudi
            </button>
          </div>
          <div className="menu-wrapper">
            <div className="link-list-wrapper menu-link-list">
              <h3 className="no-toc">{intl.formatMessage(messages.index)}</h3>
              <ul className="link-list">
                {headers.map((item, i) => (
                  <li className="nav-item" key={item.id}>
                    <a
                      className={`nav-link ${
                        item.id === activeSection && 'active'
                      }`}
                      href={`#${item.id}`}
                      onClick={handleClickAnchor(item.id)}
                    >
                      <span>{item.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  ) : null;
};
export default SideMenu;
