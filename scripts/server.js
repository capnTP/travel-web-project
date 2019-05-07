const request = require('request');

require('babel-register')({ ignore: [/(node_modules)/], presets: ['env', 'react-app'] });

require('../server/index.js');

// slack cash reporting
process.on('uncaughtException', err => {
  if (process.env.NODE_ENV === 'production') {
    // TODO: use axios
    request.post(
      {
        url: 'https://hooks.slack.com/services/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',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `${'*Server Crash :*  :bomb: :bomb: status : '}${err.status} \n details. ${
            err.message
          }`,
          username: 'Smart Bot',
          icon_emoji: ':loud_sound:',
        }),
      },
      reqError => {
        if (reqError) {
          console.log(reqError);
        }
        process.exit(1);
      },
    );
  } else {
    process.exit(1);
  }
});
