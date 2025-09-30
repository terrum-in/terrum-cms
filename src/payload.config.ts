import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'

import { Users } from '@/collections/Users'
import { Media } from '@/collections/Media'
import Brand from '@/collections/Brands'
import Event from '@/collections/Events'
import ShoppingCategory from '@/collections/ShoppingCategories'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { importExportPlugin } from '@payloadcms/plugin-import-export'
import { resendAdapter } from '@payloadcms/email-resend'
import { hasRole } from '@/utils/roleChecker'
import RecyclingItems from '@/collections/RecyclingItems'
import SustainabilityStandards from '@/collections/SustainabilityStandards'
import Countries from './collections/Countries'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  cors: ['http://localhost:3001'],
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Brand,
    Event,
    ShoppingCategory,
    RecyclingItems,
    SustainabilityStandards,
    Countries,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    s3Storage({
      collections: {
        media: {
          prefix: 'terrum-cms/media',
        },
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION,
      },
    }),
    formBuilderPlugin({
      fields: {
        text: true,
        textarea: true,
        select: true,
        email: true,
        state: true,
        country: true,
        checkbox: true,
        number: true,
        message: true,
        payment: false,
      },
      formOverrides: {
        access: {
          read: ({ req }) => hasRole(req, ['admin', 'staff']),
          create: ({ req }) => hasRole(req, ['admin', 'staff']),
          update: ({ req }) => hasRole(req, ['admin', 'staff']),
          delete: ({ req }) => hasRole(req, ['admin', 'staff']),
        },
      },
      formSubmissionOverrides: {
        access: {
          read: ({ req }) => hasRole(req, ['admin', 'staff']),
          create: ({ req }) => hasRole(req, ['admin', 'staff']),
          update: ({ req }) => hasRole(req, ['admin', 'staff']),
          delete: ({ req }) => hasRole(req, ['admin', 'staff']),
        },
      },
    }),
    importExportPlugin({
      collections: ['brands'],
      overrideExportCollection: (collection) => {
        collection.admin.group = 'System'
        collection.access = {
          read: ({ req }) => hasRole(req, ['admin', 'staff']),
          create: ({ req }) => hasRole(req, ['admin', 'staff']),
          update: ({ req }) => hasRole(req, ['admin', 'staff']),
          delete: ({ req }) => hasRole(req, ['admin', 'staff']),
        }
        collection.upload.staticDir = path.resolve(dirname, 'uploads')
        return collection
      },
      disableJobsQueue: true,
    }),
  ],
  email: resendAdapter({
    defaultFromAddress: 'cms@terrum.in',
    defaultFromName: 'Terrum CMS',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
})
