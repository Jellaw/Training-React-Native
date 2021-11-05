module.exports = {
  process: function (_, filename) {
    if (filename.match(/\.[png|svg]/)) {
      const path = filename.replace(__dirname.replace('/jest', '/src'), '~');
      return 'module.exports ="file:' + path + '";';
    }
    return 'module.exports = {};';
  },
};
