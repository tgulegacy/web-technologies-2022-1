export default class ListItems {
  constructor(el, data) {
    this.el = el
    this.data = data
  }

  init() {
    const parents = this.el.querySelectorAll('[data-parent]')
    
    parents.forEach(parent => {
      const open = parent.querySelector('[data-open]')
      
      open.addEventListener('click', () => this.toggleItems(parent) )
    })
  }
  
  render() {
    this.el.insertAdjacentElement('beforeend', this.renderParent(this.data))
  }
  
  renderParent() {
    // проверка hasChildren
    
    // render
    
    // if hasChildren renderParent()
  }
  
  renderChildren() {
    
  }
  
  toggleItems(parent) {
    parent.classList.toggle('list-item_open')
  }
}