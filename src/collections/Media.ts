import type { CollectionConfig } from 'payload'
import { hasRole } from '@/utils/roleChecker'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: ({ req }) => hasRole(req, ['admin', 'staff']),
    create: ({ req }) => hasRole(req, ['admin', 'staff']),
    update: ({ req }) => hasRole(req, ['admin', 'staff']),
    delete: ({ req }) => hasRole(req, ['admin', 'staff']),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
