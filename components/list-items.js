export default class ListItems {
	constructor(el, data) {
		this.el = el;
		this.data = data;
		this.init();
	}

	init () {
		const parents = this.el.querySelectorAll('[data-parent]');

		if (parents.length !== 0) {
			parents.forEach( parent => {
				const open = parent.querySelector('[data-open]');

				open.addEventListener('click', () => this.toggleItems(parent));
			} )
		}
	}

	render() {
		this.el.insertAdjacentElement('beforeend', this.renderParent(this.data));
	}

	renderParent(data) {
		//проверку на hasChildren

		//render

		// if hasChildren renderParent();
	}

	renderChildren() {

	}

	toggleItems(parent) {
		parent.classList.toggle('list-item_open');
	}
}
