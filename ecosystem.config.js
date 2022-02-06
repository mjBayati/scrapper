module.exports = {
  apps: [{
    name: 'channel-bot',
    script: 'node index.js',
    instances: '1',
    error_file: 'err.log',
    out_file: 'out.log',
    env: {
      NODE_ENV: 'production',
    },
    env_development: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }],
};
