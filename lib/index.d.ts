import { Page } from 'puppeteer';
import { ParserSettings } from './types';
import { mergeParserSettings } from './merger';
export declare function tableParser(page: Page, settings: ParserSettings & {
    asArray: true;
}): Promise<string[]>;
export declare function tableParser(page: Page, options: ParserSettings): Promise<string>;
export default tableParser;
export { mergeParserSettings };
//# sourceMappingURL=index.d.ts.map