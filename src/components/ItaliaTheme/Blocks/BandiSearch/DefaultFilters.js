import { useSelector } from 'react-redux';
import { useIntl, defineMessages } from 'react-intl';
import { flattenToAppURL } from '@plone/volto/helpers';
import {
  TextFilter,
  SelectFilter,
  DateRangeFilter,
} from 'design-comuni-plone-theme/components/ItaliaTheme/Blocks/Common/SearchFilters';
import { getSearchBandiFilters } from 'design-comuni-plone-theme/actions';
import { getLocalTimeZone } from '@internationalized/date';

const messages = defineMessages({
  text_filter: {
    id: 'searchBlock_text_filter',
    defaultMessage: 'Filtro di testo',
  },
  tipologia_filter: {
    id: 'searchBlock_tipologia_filter',
    defaultMessage: 'Filtro per tipologia',
  },
  tipologia: {
    id: 'sarchBandi_tipologia_placeholder',
    defaultMessage: 'Tipologia',
  },
  ente_filter: {
    id: 'searchBlock_ente_filter',
    defaultMessage: 'Filtro per Ente',
  },
  ente: {
    id: 'sarchBandi_ente_placeholder',
    defaultMessage: 'Ente',
  },
  ufficio_responsabile_filter: {
    id: 'searchBlock_ufficio_responsabile_filter',
    defaultMessage: 'Filtro per Ufficio responsabile',
  },
  ufficio_responsabile: {
    id: 'sarchBandi_ufficio_responsabile_placeholder',
    defaultMessage: 'Ufficio responsabile',
  },
  categoria_filter: {
    id: 'searchBlock_categoria_filter',
    defaultMessage: 'Filtro per Categoria',
  },
  categoria_filter_placeholder: {
    id: 'sarchBandi_categoria_placeholder',
    defaultMessage: 'Categoria',
  },
  scadenza_filter: {
    id: 'searchBlock_scadenza_filter',
    defaultMessage: 'Filtro per data di scadenza del bando',
  },
  scadenza_dal: {
    id: 'searchBlock_scadenza_filter_from',
    defaultMessage: 'Scadenza dal',
  },
  scadenza_al: {
    id: 'searchBlock_scadenza_filter_to',
    defaultMessage: 'Scadenza al',
  },
  search_keyword: {
    id: 'Cerca per parola chiave',
    defaultMessage: 'Cerca per parola chiave',
  },
});

const DefaultFilters = () => {
  const intl = useIntl();
  const subsite = useSelector((state) => state.subsite?.data);

  return {
    text_filter: {
      label: intl.formatMessage(messages.text_filter),
      type: 'text_filter',
      widget: {
        component: TextFilter,
        props: {
          value: '',
          placeholder: intl.formatMessage(messages.search_keyword),
        },
      },
      query: (value, query) => {
        if (value) {
          query.push({
            i: 'SearchableText',
            o: 'plone.app.querystring.operation.string.contains',
            v: value + '*',
          });
        }
      },
    },
    tipologia_filter: {
      label: intl.formatMessage(messages.tipologia_filter),
      type: 'tipologia_filter',
      widget: {
        component: SelectFilter,
        props: {
          value: null,
          options: {
            vocabulary: 'redturtle.bandi.tipologia.vocabulary',
            placeholder: intl.formatMessage(messages.tipologia),
          },
        },
      },
      query: (value, query) => {
        if (value?.value) {
          query.push({
            i: 'tipologia_bando',
            o: 'plone.app.querystring.operation.selection.any',
            v: value.value,
          });
        }
      },
    },
    ente_filter: {
      label: intl.formatMessage(messages.ente_filter),
      type: 'ente_filter',
      widget: {
        component: SelectFilter,
        props: {
          value: null,
          options: {
            vocabulary: 'redturtle.bandi.enti.vocabulary',
            placeholder: intl.formatMessage(messages.ente),
          },
        },
      },
      query: (value, query) => {
        if (value?.value) {
          query.push({
            i: 'ente_bando',
            o: 'plone.app.querystring.operation.selection.any',
            v: value.value,
          });
        }
      },
    },
    ufficio_responsabile_filter: {
      label: intl.formatMessage(messages.ufficio_responsabile_filter),
      type: 'ufficio_responsabile_filter',
      widget: {
        component: SelectFilter,
        props: {
          value: null,
          options: {
            dispatch: {
              action: getSearchBandiFilters,
              path: subsite ? flattenToAppURL(subsite['@id']) : '/',
              stateSelector: 'searchBandiFilters',
              resultProp: 'offices',
            },
            placeholder: intl.formatMessage(messages.ufficio_responsabile),
          },
        },
      },
      query: (value, query) => {
        if (value?.value) {
          query.push({
            i: 'ufficio_responsabile',
            o: 'plone.app.querystring.operation.selection.any',
            v: value.value,
          });
        }
      },
    },
    categoria_filter: {
      label: intl.formatMessage(messages.categoria_filter),
      type: 'categoria_filter',
      widget: {
        component: SelectFilter,
        props: {
          value: null,
          options: {
            dispatch: {
              action: getSearchBandiFilters,
              path: subsite ? flattenToAppURL(subsite['@id']) : '/',
              stateSelector: 'searchBandiFilters',
              resultProp: 'subjects',
            },
            placeholder: intl.formatMessage(
              messages.categoria_filter_placeholder,
            ),
          },
        },
      },
      query: (value, query) => {
        if (value?.value) {
          query.push({
            i: 'Subject',
            o: 'plone.app.querystring.operation.selection.any',
            v: value.value,
          });
        }
      },
    },
    scadenza_filter: {
      label: intl.formatMessage(messages.scadenza_filter),
      type: 'date_filter',
      widget: {
        component: DateRangeFilter,
        props: {
          value: {
            start: null,
            end: null,
          },
          showClearDates: true,
          showInputLabels: true,
          startLabel: intl.formatMessage(messages.scadenza_dal),
          endLabel: intl.formatMessage(messages.scadenza_al),
        },
      },

      reducer: (value, state) => {
        let start, end;
        if (value) {
          start = value.start;
          end = value.end;
        } else {
          start = state.widget.props.value.start;
          end = state.widget.props.value.end;
        }
        return {
          start,
          end,
        };
      },
      query: (value, query) => {
        let start, end;
        if (value?.start || value?.end) {
          if (value?.start && !value.end) {
            start = value.start.toDate(getLocalTimeZone());

            query.push({
              i: 'scadenza_bando',
              o: 'plone.app.querystring.operation.date.largerThan', //plone.app.querystring.operation.date.largerThan
              v: start.toISOString(),
            });
          } else if (!value?.start && value?.end) {
            end = value.end.cycle('day', 1).toDate(getLocalTimeZone());

            query.push({
              i: 'scadenza_bando',
              o: 'plone.app.querystring.operation.date.lessThan', //plone.app.querystring.operation.date.lessThan
              v: end.toISOString(),
            });
          } else {
            start = value.start.toDate(getLocalTimeZone());
            end = value.end.cycle('day', 1).toDate(getLocalTimeZone());

            query.push({
              i: 'scadenza_bando',
              o: 'plone.app.querystring.operation.date.between',
              v: [start.toISOString(), end.toISOString()],
            });
          }
        }
      },
    },
  };
};

export default DefaultFilters;
