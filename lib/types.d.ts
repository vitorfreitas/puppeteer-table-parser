export interface ExtraCol {
    colName: string;
    data: string;
    position?: number;
}
export declare type GetColumnIndexType = (colName: string) => number;
export interface ParserSettingsOptional {
    temporaryColNames: string[];
    extraCols: ExtraCol[];
    withHeader: boolean;
    csvSeparator: string;
    newLine: string;
    rowValidator: (row: string[], getColumnIndex: GetColumnIndexType) => boolean;
    rowTransform: (row: string[], getColumnIndex: GetColumnIndexType) => void;
    asArray: boolean;
    colFilter: (elText: string[], index: number) => string;
    colParser: (value: string, formattedIndex: number, getColumnIndex: GetColumnIndexType) => string;
}
export interface ParserSettings extends Partial<ParserSettingsOptional> {
    selector: string;
    readonly allowedColNames: Record<string, string>;
}
export declare type FullParserSettings = Required<ParserSettings>;
export declare type ExtraColsMapper = (row: string[], key: keyof ExtraCol) => string[];
export interface MergeParserSettings {
    allowedColNames: FullParserSettings['allowedColNames'];
    extraCols: FullParserSettings['extraCols'];
    temporaryColNames: FullParserSettings['temporaryColNames'];
}
//# sourceMappingURL=types.d.ts.map