CookieConsent.run({
  cookie: {
    name: 'cc_help',
    domain: window.location.host,
    expiresAfterDays: 365,
  },
  categories: {
    necessary: {
      enabled: true,
      readOnly: true,
      services: {
        liveChatInc: {
          label: 'LiveChat',
          onAccept: () => {},
          onReject: () => {},
        },
      },
    },
    advertising: {
      enabled: false,
      autoClear: {
        cookies: [
          { name: 'IDE', domain: 'doubleclick.net' },
          { name: 'AID', domain: 'google.com' },
        ],
      },
      services: {
        googleAds: {
          label: 'Google Ads',
          onAccept: () => {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ event: 'consent_given' });
          },
          onReject: () => {},
        },
      },
    },
  },
  guiOptions: {
    consentModal: {
      layout: 'bar inline',
      position: 'bottom',
      flipButtons: false,
      equalWeightButtons: false,
    },
    preferencesModal: {
      layout: 'box',
      position: 'left',
      flipButtons: false,
      equalWeightButtons: true,
    },
  },
  language: {
    default: 'en',
    autoDetect: 'document',
    translations: {
      en: async () => {
        const res = await fetch('https://cdn.ganttpro.com/statics/cookieconsent/en.json');
        return await res.json();
      },
    },
  },
});
