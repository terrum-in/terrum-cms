import { CollectionConfig } from 'payload'

const Regions: CollectionConfig = {
  slug: 'regions',
  labels: { singular: 'Region', plural: 'Regions' },
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
      name: 'flag',
      type: 'number',
      defaultValue: 1,
      required: true,
    },
    {
      name: 'wikiDataId',
      type: 'text',
    },
  ],
}

export default Regions
