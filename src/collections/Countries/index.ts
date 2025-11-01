import { hasRole } from '@/utils/roleChecker'
import { CollectionConfig } from 'payload'

const Countries: CollectionConfig = {
  slug: 'countries',
  labels: {
    singular: 'Country',
    plural: 'Countries',
  },
  defaultSort: 'name',
  admin: {
    hidden: true,
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
      name: 'numericCode',
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
      name: 'currencyName',
      type: 'text',
    },
    {
      name: 'currencySymbol',
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
      name: 'regionName',
      type: 'text',
      required: false,
    },
    {
      name: 'region',
      type: 'relationship',
      relationTo: 'regions',
      required: false,
    },
    {
      name: 'subregionName',
      type: 'text',
      required: false,
    },
    {
      name: 'subregion',
      type: 'relationship',
      relationTo: 'subregions',
      required: false,
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
  ],
  timestamps: true,
  access: {
    read: ({ req }) => hasRole(req, ['admin', 'staff']),
    create: () => false,
    update: () => false,
    delete: () => false,
  },
}

export default Countries
