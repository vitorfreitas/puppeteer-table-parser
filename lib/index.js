"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeParserSettings = exports.tableParser = void 0;
const helpers_1 = require("./helpers");
const parseTable_1 = require("./parseTable");
const merger_1 = require("./merger");
Object.defineProperty(exports, "mergeParserSettings", { enumerable: true, get: function () { return merger_1.mergeParserSettings; } });
const defaultSettings = {
    extraCols: [],
    withHeader: true,
    csvSeparator: ';',
    newLine: '\n',
    rowValidator: () => true,
    rowTransform: () => { },
    asArray: false,
    temporaryColNames: [],
    colFilter: (elText) => elText.join(' '),
    colParser: (value) => value.trim(),
};
async function tableParser(page, options) {
    const settings = { ...defaultSettings, ...options };
    helpers_1.validateSettings(settings);
    const tables = await Promise.all((await page.$$(settings.selector)).filter(async (table) => {
        const nodeName = await table.evaluate((table) => table.nodeName);
        if (nodeName.toUpperCase() !== 'TABLE') {
            console.warn('Invalid selector! Element is not table!');
            return false;
        }
        return true;
    }));
    if (tables.length === 0) {
        throw new Error('No tables found! Probably wrong table selector!');
    }
    const parseTable = parseTable_1.parseTableFactory(settings);
    let headerFound = false;
    const dataTables = [];
    for (const table of tables) {
        const withHeader = settings.withHeader && !headerFound;
        const data = await parseTable(table, withHeader);
        if (data.length > 0 && withHeader) {
            headerFound = true;
        }
        dataTables.push(data);
    }
    const filteredDataTables = dataTables.flat().filter(Boolean);
    return settings.asArray ? filteredDataTables : filteredDataTables.join(settings.newLine);
}
exports.tableParser = tableParser;
exports.default = tableParser;
//# sourceMappingURL=index.js.map