import { CollectionConfig } from 'payload'
import { hasRole } from '@/utils/roleChecker'

const Brand: CollectionConfig = {
  slug: 'brands',
  labels: {
    singular: 'Brand',
    plural: 'Brands',
  },
  admin: {
    defaultColumns: ['name', 'industry', 'website', 'country', 'createdBy', 'updatedBy'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      maxLength: 128,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'industry',
      type: 'text',
      required: true,
    },
    {
      name: 'country',
      type: 'relationship',
      relationTo: 'countries',
      hasMany: false,
      required: true,
    },
    {
      name: 'contactEmail',
      type: 'email',
      required: true,
    },
    {
      name: 'phoneNumber',
      type: 'text',
      required: false,
      validate: (value?: string | string[] | null) => {
        if (typeof value === 'string') {
          const phonePattern = new RegExp(
            '^\\+?[1-9]\\d{1,14}$', // E.164 international phone format
          )
          if (phonePattern.test(value)) {
            return true
          }
          return 'Invalid phone number format.'
        }
        return true // Allow empty if not required
      },
    },
    {
      name: 'website',
      type: 'text',
      required: true,
      unique: true,
      validate: (value?: string | string[] | null) => {
        if (typeof value === 'string') {
          const urlPattern = new RegExp(
            '^(https?:\\/\\/)?' + // Protocol (optional)
              '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // Domain name
              '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
              '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // Port and path
              '(\\?[;&a-z\\d%_.~+=-]*)?' + // Query string
              '(\\#[-a-z\\d_]*)?$', // Fragment locator
            'i',
          )

          if (urlPattern.test(value)) {
            return true
          }
          return 'Invalid URL format.'
        }
        return 'Invalid URL format.'
      },
    },
    {
      name: 'productsAndServicesOffered',
      label: 'Products and Services Offered',
      type: 'textarea',
      required: false,
    },
    {
      name: 'sustainabilityStandards',
      label: 'Sustainability Standards',
      type: 'relationship',
      relationTo: 'sustainability-standards',
      hasMany: true,
      required: false,
    },
    {
      name: 'serviceableLocations',
      label: 'Serviceable Locations',
      type: 'relationship',
      relationTo: ['regions', 'countries', 'states', 'cities'],
      hasMany: true,
    },
    {
      name: 'foundedYear',
      label: 'Founded Year',
      type: 'number',
      required: false,
      min: 1800,
      max: new Date().getFullYear(),
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'updatedBy',
      type: 'relationship',
      relationTo: 'users',
      required: false,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'shoppingCategories',
      type: 'relationship',
      required: false,
      hasMany: true,
      relationTo: 'shopping-categories',
    },
    {
      name: 'socialMediaLinks',
      type: 'array',
      label: 'Social Media Links',
      minRows: 1,
      maxRows: 10,
      labels: {
        singular: 'Social Media Link',
        plural: 'Social Media Link',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'link',
          type: 'text',
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ req, data, operation }) => {
        if (operation === 'create') {
          data.createdBy = req.user?.id
        }
        if (operation === 'update') {
          data.updatedBy = req.user?.id
        }
      },
    ],
  },
  access: {
    read: ({ req }) => hasRole(req, ['osdc', 'admin', 'staff']),
    create: ({ req }) => hasRole(req, ['osdc', 'admin', 'staff']),
    update: ({ req }) => hasRole(req, ['osdc', 'admin', 'staff']),
    delete: ({ req }) => hasRole(req, ['osdc', 'admin', 'staff']),
  },
}

export default Brand
