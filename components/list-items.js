export default class ListItems {
  constructor(el, data) {
    this.el = el
    this.data = data
  }

  init() {
    if (!this.el) {
      return
    }
    const parents = this.el.querySelectorAll('[data-parent]')

    parents.forEach(parent => {
      const open = parent.querySelector('[data-open]')

      open.addEventListener('click', () => this.toggleItems(parent) )
    })
  }

  render() {
    if (!this.el) {
      return
    }
    this.el.insertAdjacentHTML('beforeend', this.renderParent(this.data))
  }

  renderParent(element) {
    let html = ''

    element.items.forEach(item => {
      if (item.hasChildren) {
        html += this.renderParent(item)
      } else {
        html += this.renderChildren(item)
      }
    })

    return `
    <div class="list-item list-item--parent" data-parent>
        <div class="list-item__inner">
            <img class="list-item__arrow" src="/assets/img/chevron-down.png" alt="Стрелка вниз" data-open>
        
            <img class="list-item__folder" src="/assets/img/folder.png" alt="Папка">
    
            <span>${element.name}</span>
        </div>

        <div class="list-item__items">
            ${html}
        </div>
    </div>
    `
  }

  renderChildren(item) {
    return `
    <div class="list-item list-item--child" data-child>
        <div class="list-item__inner">
            <img class="list-item__folder" src="/assets/img/folder.png" alt="Папка">

            <span>${item.name}</span>
        </div>
    </div>
    `
  }

  toggleItems(parent) {
    parent.classList.toggle('list-item_open')
  }
}
