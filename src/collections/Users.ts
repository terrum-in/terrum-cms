import type { CollectionConfig } from 'payload'
import { hasRole } from '@/utils/roleChecker'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      options: [
        { value: 'admin', label: 'Admin' },
        { value: 'osdc', label: 'Open Source Database Contributor' },
        { value: 'staff', label: 'Staff' },
      ],
    },
  ],
  access: {
    read: ({ req }) => hasRole(req, ['admin', 'staff']),
    create: ({ req }) => hasRole(req, ['admin', 'staff']),
    update: ({ req }) => hasRole(req, ['admin', 'staff']),
    delete: ({ req }) => hasRole(req, ['admin', 'staff']),
  },
}
