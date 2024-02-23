/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    testMatch: ['**/build/test.js'],
    setupFilesAfterEnv: ['./test/setup-tests.js']
};

module.exports = config;