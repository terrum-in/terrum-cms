import { CollectionConfig } from 'payload'

export const States: CollectionConfig = {
  slug: 'states',
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
      name: 'country',
      type: 'relationship',
      relationTo: 'countries',
      required: true,
    },
    {
      name: 'countryCode',
      type: 'text',
      required: true,
      maxLength: 2,
    },
    {
      name: 'fipsCode',
      type: 'text',
      required: false,
    },
    {
      name: 'iso2',
      type: 'text',
      required: false,
    },
    {
      name: 'type',
      type: 'text',
      required: false,
    },
    {
      name: 'latitude',
      type: 'number',
      required: false,
    },
    {
      name: 'longitude',
      type: 'number',
      required: false,
    },
  ],
}
