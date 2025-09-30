import { CollectionConfig } from 'payload'

const Countries: CollectionConfig = {
  slug: 'countries',
  labels: {
    singular: 'Country',
    plural: 'Countries',
  },
  defaultSort: 'name',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'capital', 'currency_name', 'emoji'],
    pagination: {
      defaultLimit: 100,
      limits: [25, 50, 100],
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'iso3',
      type: 'text',
      maxLength: 3,
    },
    {
      name: 'numeric_code',
      type: 'text',
      maxLength: 3,
    },
    {
      name: 'iso2',
      type: 'text',
      maxLength: 2,
    },
    {
      name: 'phonecode',
      type: 'text',
    },
    {
      name: 'capital',
      type: 'text',
    },
    {
      name: 'currency',
      type: 'text',
    },
    {
      name: 'currency_name',
      type: 'text',
    },
    {
      name: 'currency_symbol',
      type: 'text',
    },
    {
      name: 'tld',
      type: 'text',
    },
    {
      name: 'native',
      type: 'text',
    },
    {
      name: 'nationality',
      type: 'text',
    },
    {
      name: 'timezones',
      type: 'textarea',
    },
    {
      name: 'translations',
      type: 'textarea',
    },
    {
      name: 'latitude',
      type: 'number',
      admin: {
        step: 0.00000001,
      },
    },
    {
      name: 'longitude',
      type: 'number',
      admin: {
        step: 0.00000001,
      },
    },
    {
      name: 'emoji',
      type: 'text',
    },
    {
      name: 'emojiU',
      type: 'text',
    },
    {
      name: 'flag',
      type: 'number',
      defaultValue: 1,
    },
    {
      name: 'wikiDataId',
      type: 'text',
    },
  ],
  timestamps: true,
  access: {
    read: () => true, // anyone can read
    create: () => false, // block creation
    update: () => false, // block updates
    delete: () => false, // block deletes
  },
}

export default Countries
