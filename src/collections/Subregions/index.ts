import { CollectionConfig } from 'payload'

const Subregions: CollectionConfig = {
  slug: 'subregions',
  labels: { singular: 'Subregion', plural: 'Subregions' },
  admin: {
    hidden: true,
  },
  access: {
    read: () => true,
    create: () => false,
    update: () => false,
    delete: () => false,
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
  ],
}

export default Subregions
