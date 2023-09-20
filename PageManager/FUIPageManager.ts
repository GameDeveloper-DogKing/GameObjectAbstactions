/**　
 * 【Statement】A page manager based on GList in FairyGUI.
 * 【Functionality】New page, Remove page, Get page, Flip page, Slide page.
 */
class FUIPageManager extends PageManager<fairygui.GObject> {
    constructor(protected readonly _list: fairygui.GList, defaultPageNumber: number = 0) {
        super(defaultPageNumber);
        this.flipPage(this._currentPageNumber);
    }

    newPage(): fairygui.GObject {
        if (this._list.defaultItem == null) {
            console.error(`Create page failed! Default page is not exist, please assign it firstly.`);
            return null;
        }

        return this._list.addItemFromPool();
    }

    removePage(pageNumber: number) {
        const targetPage = this._list.getChildAt(pageNumber);

        if (targetPage == null) {
            console.error(`Remove page failed! Target page is not exist. {pageNumber: ${pageNumber}}`);
            return;
        }

        return this._list.removeChildToPool(targetPage);
    }

    getPage(pageNumber: number) {
        const targetPage = this._list.getChildAt(pageNumber);

        if (targetPage == null) {
            console.error(`Page is not exist. {pageNumber: :${pageNumber}}`)
            return null;
        }

        return targetPage;
    }

    flipPage(pageNumber: number) {
        const targetPage = this._list.getChildAt(pageNumber);

        if (targetPage == null) {
            console.error(`Flip page failed! Target page is not exist. {pageNumber: ${pageNumber}}`);
            return;
        }

        this._list.scrollPane.scrollToView(targetPage);
    }

    flipPageToPreviousPage() {
        this._currentPageNumber = this.reCalculateCurrentPageNumber();

        if (this._currentPageNumber === 0) {
            console.error(`Flip page failed! Unable to flip to left.`);
            return;
        }

        this._currentPageNumber -= 1;
        this._list.scrollPane.scrollToView(this._list.getChildAt(this._currentPageNumber));
    }

    flipPageToNextPage() {
        this._currentPageNumber = this.reCalculateCurrentPageNumber();

        const pageAmount = this._list.numItems;
        if (this._currentPageNumber === pageAmount - 1) {
            console.error(`Flip page failed! Unable to flip to next.`);
            return;
        }

        this._currentPageNumber += 1;
        this._list.scrollPane.scrollToView(this._list.getChildAt(this._currentPageNumber));
    }

    set isSlideModeEnabled(isEnabled: boolean) {
        this._list.scrollPane.touchEffect = isEnabled;
    }

    private reCalculateCurrentPageNumber(): number {
        const scrollPane = this._list.scrollPane;
        const allPages = this._list._children;

        let nearestPage;
        allPages.forEach(page => {
            if (Math.abs(scrollPane.posX - page.x) < page.width) {
                nearestPage = page;
            }
        })

        return this._list.getChildIndex(nearestPage);
    }
}
