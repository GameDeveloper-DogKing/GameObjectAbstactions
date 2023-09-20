/**　
 * 【Statement】A UI queue.
 * 【Functionality】Add, Add UI, Check, Remove, Update UI When element changed.
 */
abstract class UIQueue<T, TUI> {
    constructor(protected readonly _elements: Array<T> = new Array(), protected readonly _elementUIs: Array<TUI> = new Array()) { }

    add(element: T) {
        this._elements.push(element);
        this.updateUI();
    };

    addUI(elementUI: TUI) {
        this._elementUIs.push(elementUI);
    }

    has(element: T): boolean {
        return this._elements.indexOf(element) !== -1;
    }

    remove(elementIdx: number) {
        this._elements.splice(elementIdx, 1);
        this.updateUI();
    };

    clear() {
        this._elements.length = 0;
        this.updateUI();
    };

    protected updateUI() {
    }
}