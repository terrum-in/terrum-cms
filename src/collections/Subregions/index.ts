import { CollectionConfig } from 'payload'

const Subregions: CollectionConfig = {
  slug: 'subregions',
  labels: { singular: 'Subregion', plural: 'Subregions' },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      maxLength: 100,
    },
    {
      name: 'translations',
      type: 'json',
    },
    {
      name: 'region',
      type: 'relationship',
      relationTo: 'regions',
      required: true, 
    },
    {
      name: 'wikiDataId',
      type: 'text',
    },
  ],
}

export default Subregions
