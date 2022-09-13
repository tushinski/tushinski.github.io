const path = require("path");

const abs = (relativePath) => path.resolve(__dirname, '../../', relativePath);

const constants = {
    paths: {
        common: {
            build: abs("./build"),
            prodBuild: abs("./docs"),
            root: abs("."),
        },
        app: {
            index: abs("./app/index.tsx"),
            template: abs("./app/ejs/index.ejs"),
        },
        tests: {
            index: abs("./test/test.ts"),
        }
    },
};

module.exports = constants;