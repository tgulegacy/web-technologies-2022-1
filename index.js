import ListItems from "./components/list-items.js";

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}

function init() {
  const data = {
    name: 'Каталог товаров',
    hasChildren: true,
    items: [
      {
        name: 'Мойки',
        hasChildren: true,
        items: [
          {
            name: 'Ulgran1',
            hasChildren: true,
            items: [
              {
                name: 'SMT1',
                hasChildren: false,
                items: []
              },
              {
                name: 'SMT2',
                hasChildren: false,
                items: []
              }
            ]
          },
          {
            name: 'Ulgran2',
            hasChildren: true,
            items: [
              {
                name: 'SMT3',
                hasChildren: false,
                items: []
              },
              {
                name: 'SMT4',
                hasChildren: false,
                items: []
              }
            ]
          }
        ]
      },{
        name: 'Фильтры',
        hasChildren: true,
        items: [
          {
            name: 'Ulgran3',
            hasChildren: true,
            items: [
              {
                name: 'SMT5',
                hasChildren: false,
                items: []
              },
              {
                name: 'SMT6',
                hasChildren: false,
                items: []
              }
            ]
          }
        ]
      }
    ]
  }
  
  const items = new ListItems(document.getElementById('list-items'), data)
  
  items.render()
  items.init()
}