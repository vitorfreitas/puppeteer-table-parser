"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeParserSettings = void 0;
const mergeParserSettings = (to, from, ignoredAllowedColumns = []) => {
    const newConfig = {
        temporaryColNames: to.temporaryColNames.slice(),
        extraCols: to.extraCols.slice(),
        allowedColNames: Object.assign({}, to.allowedColNames),
    };
    newConfig.extraCols.unshift(...from.extraCols.map((extraCol) => {
        extraCol.data = extraCol.data || '';
        return extraCol;
    }));
    from.temporaryColNames
        .filter((tempCol) => !newConfig.temporaryColNames.includes(tempCol))
        .forEach((tempCol) => newConfig.temporaryColNames.push(tempCol));
    // Get columns from general table
    const generalColNames = Object.entries(from.allowedColNames);
    // Merge them together
    generalColNames.reverse().forEach(([key, val], index) => {
        const realPosition = generalColNames.length - index - 1;
        // If columns does not exists yet and is not excluded
        if (!Object.prototype.hasOwnProperty.call(newConfig.allowedColNames, key) &&
            !ignoredAllowedColumns.includes(key)) {
            const searchEntry = newConfig.extraCols.find((col) => col.colName === key);
            // Column already exists, just update position to match
            if (searchEntry) {
                searchEntry.position = realPosition;
                return;
            }
            // Insert new column
            newConfig.extraCols.unshift({
                colName: val,
                data: '',
                position: realPosition,
            });
        }
    });
    return newConfig;
};
exports.mergeParserSettings = mergeParserSettings;
exports.default = exports.mergeParserSettings;
//# sourceMappingURL=merger.js.map