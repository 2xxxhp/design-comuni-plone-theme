//config.settings.slate.contextToolbarButtons
import installAlignment from 'design-comuni-plone-theme/config/Slate/Alignment';
import installHeadings from 'design-comuni-plone-theme/config/Slate/Headings';
import installUnderline from 'design-comuni-plone-theme/config/Slate/Underline';
import installBlockquote from 'design-comuni-plone-theme/config/Slate/Blockquote';

export default function applyItaliaSlateConfig(config) {
  installAlignment(config);
  installHeadings(config);
  installUnderline(config);

  installBlockquote(config);

  //remove callout because there's a Volto's block for it
  delete config.settings.slate.elements.callout;
  delete config.settings.slate.buttons.callout;
  config.settings.slate.toolbarButtons = config.settings.slate.toolbarButtons.filter(
    (b) => b !== 'callout',
  );
  config.settings.slate.expandedToolbarButtons = config.settings.slate.toolbarButtons.filter(
    (b) => b !== 'callout',
  );
}