import { CollectionConfig } from 'payload'

const Regions: CollectionConfig = {
  slug: 'regions',
  labels: { singular: 'Region', plural: 'Regions' },
  admin: {
    hidden: true,
    useAsTitle: 'name',
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
  ],
}

export default Regions
