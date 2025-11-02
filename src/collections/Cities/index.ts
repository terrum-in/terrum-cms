import { CollectionConfig } from 'payload'

export const Cities: CollectionConfig = {
  slug: 'cities',
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
      maxLength: 255,
    },
    {
      name: 'state',
      type: 'relationship',
      relationTo: 'states',
      required: true,
    },
    {
      name: 'stateCode',
      type: 'text',
      required: true,
      maxLength: 255,
    },
    {
      name: 'country',
      type: 'relationship',
      relationTo: 'countries',
    },
    {
      name: 'countryCode',
      type: 'text',
      required: true,
      maxLength: 2,
    },
    {
      name: 'latitude',
      type: 'number',
      required: true,
    },
    {
      name: 'longitude',
      type: 'number',
      required: true,
    },
  ],
}
