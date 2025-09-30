import { CollectionConfig } from 'payload'
import { hasRole } from '@/utils/roleChecker'

const ShoppingCategory: CollectionConfig = {
  slug: 'shopping-categories',
  labels: {
    singular: 'Shopping Category',
    plural: 'Shopping Categories',
  },
  admin: {
    defaultColumns: ['name'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      maxLength: 64,
      admin: {
        placeholder: 'Enter category name',
      },
    },
  ],
  access: {
    read: ({ req }) => hasRole(req, ['admin', 'staff']),
    create: ({ req }) => hasRole(req, ['admin', 'staff']),
    update: ({ req }) => hasRole(req, ['admin', 'staff']),
    delete: ({ req }) => hasRole(req, ['admin', 'staff']),
  },
}

export default ShoppingCategory
