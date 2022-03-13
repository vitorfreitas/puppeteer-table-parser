"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSettings = exports.extraColsMapperFactory = void 0;
const extraColsMapperFactory = (extraCols) => {
    if (extraCols.length === 0) {
        return (row) => row;
    }
    const withPos = extraCols
        .filter((extraCol) => extraCol.position !== undefined)
        .sort((a, b) => {
        return a.position - b.position; // ASC
    });
    // Append cols without position
    const withoutPos = extraCols.filter((extraCol) => extraCol.position === undefined);
    return (row, key) => {
        const newRow = row.slice();
        withPos.forEach((extraCol) => {
            newRow.splice(extraCol.position, 0, String(extraCol[key]));
        });
        return newRow.concat(withoutPos.map((extraCol) => String(extraCol[key])));
    };
};
exports.extraColsMapperFactory = extraColsMapperFactory;
const validateSettings = (settings) => {
    // Validate extraCols mapping
    const { extraCols, temporaryColNames, allowedColNames } = settings;
    const hasConflict = extraCols.some((a) => extraCols.find((b) => a !== b && a.position === b.position));
    if (hasConflict) {
        throw new Error('One or more `extraCols` have same position!');
    }
    for (const colName of temporaryColNames) {
        if (!Object.prototype.hasOwnProperty.call(allowedColNames, colName)) {
            throw new Error(`Entry ${colName} in 'temporaryColNames' must exists in 'allowedColNames'!`);
        }
    }
    const allowedColNamesValues = Object.values(allowedColNames);
    for (const { colName } of extraCols) {
        if (allowedColNamesValues.includes(colName)) {
            throw new Error(`'${colName}' in 'extraCols' has same name as column in 'allowColNames'!`);
        }
    }
};
exports.validateSettings = validateSettings;
//# sourceMappingURL=helpers.js.map