const WDS = require('webpack-dev-server');
const path = require('path');
const webpack = require('webpack');
const conf = require('../web/webpack.config.dev');

const wpds = () => {

  const compiler = webpack(conf);
  const port = 3000;

  const server = new WDS(compiler, {
    port
  });
  server.listen(port, '127.0.0.1', () => {
    console.log(`Starting server on http://localhost:${port}`);
  });
};


wpds();