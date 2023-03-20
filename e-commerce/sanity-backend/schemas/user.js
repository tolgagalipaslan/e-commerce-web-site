export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'userName',
      title: 'User Name',
      type: 'string',
    },

    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'subId',
      title: 'ID',
      type: 'string',
    },
    {
      name: 'password',
      title: 'Password',
      type: 'string',
    },
    {
      name: 'buymentStory',
      title: 'Buyment Story',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'product'}],
        },
      ],
    },
    {
      title: 'Basket',
      type: 'array',
      name: 'basket',
      of: [
        {
          type: 'object',
          name: 'products',
          fields: [
            {type: 'reference', name: 'product', to: [{type: 'product'}]},
            {type: 'number', name: 'amount'},
          ],
        },
      ],
    },
  ],
}
