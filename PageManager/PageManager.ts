/**　
 * 【Statement】A page manager.
 * 【Functionality】New page, Remove page, Get page, Flip page.
 */
abstract class PageManager<T> {
    constructor(protected _currentPageNumber: number) { }
    abstract newPage(): T;
    abstract removePage(pageNumber: number);
    abstract getPage(pageNumber: number): T;
    abstract flipPage(pageNumber: number);
}