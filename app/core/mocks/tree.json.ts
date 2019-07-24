export const TREE: any[] = [
  { name: 'c1', class: 'far fa-eye ic-w mr-1', subnodes: [] },
  {
    name: 'c2',
    class: 'far fa-gem ic-w mx-1',
    subnodes: [{ name: 'c21', class: 'fas fa-basketball-ball ic-w mr-1', subnodes: [] }]
  },
  {
    name: 'c3',
    class: 'far fa-eye ic-w mr-1',
    subnodes: [
      {
        name: 'c31',
        class: 'far fa-eye ic-w mr-1',
        subnodes: [{ name: 'c311', class: 'far fa-gem ic-w mx-1', subnodes: [] }]
      }
    ]
  },

  {
    name: 'c4',
    class: 'far fa-eye ic-w mr-1',
    subnodes: [
      {
        name: 'c41',
        class: 'far fa-eye ic-w mr-1',
        subnodes: [
          { name: 'c411', class: 'far fa-gem ic-w mx-1', subnodes: [] },
          { name: 'c412', class: 'far fa-gem ic-w mx-1', subnodes: [] }
        ]
      }
    ]
  },
  {
    name: 'c5',
    class: 'far fa-eye ic-w mr-1',
    subnodes: [
      {
        name: 'Antonio',
        class: 'far fa-eye ic-w mr-1',
        subnodes: [
          { name: 'Ferrari', class: 'far fa-gem ic-w mx-1', subnodes: [] },
          {
            name: 'Carlos',
            class: 'far fa-gem ic-w mx-1',
            subnodes: [{ name: 'Paco', class: 'far fa-gem ic-w mx-1', subnodes: [] }]
          }
        ]
      }
    ]
  }
];
