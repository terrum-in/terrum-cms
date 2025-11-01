import { CollectionConfig, FieldHook } from 'payload'
import { hasRole } from '@/utils/roleChecker'
import { v4 as uuidv4 } from 'uuid'
import { APIError } from 'payload'
import { generateUUID } from '@/hooks/generateUUID'
import { validateUrl } from '@/validators/commons'

const Event: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'Event',
    plural: 'Events',
  },
  admin: {
    defaultColumns: ['name', 'eventUuid', 'startDate'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'actions',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: 'src/admin/components/CopyUUIDButton.tsx',
        },
      },
    },
    {
      name: 'eventUuid',
      type: 'text',
      unique: true,
      admin: {
        readOnly: true,
        description: 'Automatically generated unique identifier',
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [generateUUID],
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      maxLength: 128,
      admin: {
        placeholder: 'Enter the name of the event',
      },
    },
    {
      name: 'isHostedByTerrum',
      type: 'checkbox',
      label: 'Is hosted by Terrum?',
      defaultValue: false,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'region',
      type: 'relationship',
      relationTo: 'regions',
      hasMany: false,
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
      name: 'price',
      type: 'number',
      admin: {
        placeholder: 'Enter the price of the event (Free by default)',
      },
      required: true,
      defaultValue: 0.0,
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: {
        placeholder: 'Select the start date of the event',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      required: true,
      admin: {
        placeholder: 'Select the end date (optional)',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'startTime',
      type: 'date',
      required: true,
      admin: {
        placeholder: '12:00 PM',
        date: {
          pickerAppearance: 'timeOnly',
        },
      },
    },
    {
      name: 'endTime',
      type: 'date',
      required: true,
      admin: {
        placeholder: '12:00 PM',
        date: {
          pickerAppearance: 'timeOnly',
        },
      },
    },
    {
      name: 'venue',
      type: 'text',
      maxLength: 255,
      admin: {
        placeholder: 'Enter the venue name (optional)',
      },
    },
    {
      name: 'state',
      type: 'relationship',
      relationTo: 'states',
      hasMany: false,
      required: false,
    },
    {
      name: 'city',
      type: 'relationship',
      relationTo: 'cities',
      hasMany: false,
      required: false,
    },
    {
      name: 'neighbourhood',
      type: 'relationship',
      relationTo: 'neighbourhoods',
      hasMany: false,
      required: false,
    },
    {
      name: 'googleMapsLink',
      label: 'Venue Google Maps Link',
      type: 'text',
      required: false,
      admin: {
        placeholder: 'Enter the Google Maps link for the event',
      },
      validate: validateUrl,
    },
    {
      name: 'externalEventLink',
      label: 'External Event/Registration Link',
      type: 'text',
      required: false,
      admin: {
        placeholder: 'Enter the external event link or registration link for the event',
      },
      validate: validateUrl,
    },
    {
      name: 'earlyBirdPrice',
      type: 'number',
      required: false,
      admin: {
        placeholder: 'Enter the early bird price of the event',
      },
      validate: (
        value: number | null | undefined,
        {
          siblingData,
          data,
          originalDoc,
        }: {
          siblingData: any
          data: any
          originalDoc?: any
        },
      ): true | string => {
        const price =
          typeof siblingData?.price === 'number'
            ? siblingData.price
            : typeof data?.price === 'number'
              ? data.price
              : typeof originalDoc?.price === 'number'
                ? originalDoc.price
                : undefined

        const ebDate =
          siblingData?.earlyBirdEndDate ?? data?.earlyBirdEndDate ?? originalDoc?.earlyBirdEndDate

        // If date is set, price must be set
        if ((ebDate ?? null) && (value === null || value === undefined)) {
          return 'Early bird price is required when an early bird end date is set.'
        }

        if (value !== null && value !== undefined) {
          if (Number.isNaN(value)) return 'Early bird price must be a number.'
          if (value <= 0) return 'Early bird price must be greater than 0.'
          if (typeof price === 'number' && value >= price) {
            return 'Early bird price must be less than the regular price.'
          }
        }

        return true
      },
    },
    {
      name: 'earlyBirdEndDate',
      type: 'date',
      required: false,
      admin: {
        placeholder: 'Select the early bird end date',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'paymentLink',
      type: 'text',
      required: false,
      admin: {
        placeholder: 'Enter the payment link for the event if using external payment gateway',
      },
      validate: validateUrl,
    },
    {
      name: 'isOnline',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Check this if the event is only an online event.',
      },
    },
    {
      name: 'meetingLink',
      type: 'text',
      label: 'Online Meeting (Google/Zoom) Link',
      required: false,
      admin: {
        placeholder: 'Enter the meeting link if the event is online.',
        condition: (data) => Boolean(data?.isOnline || data?.isOnlineAndOffline),
      },
      validate: (
        value: string | null | undefined,
        { siblingData }: { siblingData: Record<string, unknown> },
      ): true | string => {
        const needsLink = Boolean(siblingData?.isOnline || siblingData?.isOnlineAndOffline)

        if (needsLink && (!value || value.trim() === '')) {
          return 'Meeting link is required when the event is online or online+offline.'
        }

        return validateUrl(value) // now perfectly typed
      },
    },
    {
      name: 'isOnlineAndOffline',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Check this if an offline event is also streamed online.',
      },
    },
    {
      name: 'location',
      type: 'point',
      label: 'Location',
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: false,
    },
    {
      name: 'agenda',
      label: 'Event Agenda',
      type: 'blocks',
      blocks: [
        {
          slug: 'session',
          labels: {
            singular: 'Session',
            plural: 'Sessions',
          },
          fields: [
            {
              name: 'time',
              label: 'Time',
              type: 'text',
              required: true,
            },
            {
              name: 'title',
              label: 'Title',
              type: 'text',
              required: true,
            },
            {
              name: 'speaker',
              label: 'Speaker',
              type: 'text',
            },
            {
              name: 'description',
              label: 'Description',
              type: 'textarea',
            },
          ],
        },
      ],
    },
    {
      name: 'deleted',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Mark this if the event is deleted.',
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data, originalDoc, operation }) => {
        if (!data) return data

        // Keep your existing meetingLink cleanup
        const isOnline = data.isOnline ?? (operation === 'update' ? originalDoc?.isOnline : false)
        const isHybrid =
          data.isOnlineAndOffline ??
          (operation === 'update' ? originalDoc?.isOnlineAndOffline : false)
        if (!isOnline && !isHybrid) data.meetingLink = null

        // --- Early Bird Validation ---
        const price =
          typeof data.price === 'number'
            ? data.price
            : operation === 'update'
              ? originalDoc?.price
              : 0

        const earlyBirdPrice =
          typeof data.earlyBirdPrice === 'number'
            ? data.earlyBirdPrice
            : operation === 'update'
              ? originalDoc?.earlyBirdPrice
              : undefined

        const earlyBirdEndDate =
          data.earlyBirdEndDate ??
          (operation === 'update' ? originalDoc?.earlyBirdEndDate : undefined)

        const hasEBPrice = typeof earlyBirdPrice === 'number' && !Number.isNaN(earlyBirdPrice)
        const hasEBDate = Boolean(earlyBirdEndDate)

        // Mutual requirement
        if (hasEBPrice && !hasEBDate) {
          throw new APIError(
            'Early bird end date is required when an early bird price is set.',
            400,
          )
        }
        if (hasEBDate && !hasEBPrice) {
          throw new APIError(
            'Early bird price is required when an early bird end date is set.',
            400,
          )
        }

        // Price relation
        if (hasEBPrice) {
          if (!price || price <= 0) {
            throw new APIError(
              'Regular price must be a positive number when early bird price is provided.',
              400,
            )
          }
          if (earlyBirdPrice >= price) {
            throw new APIError('Early bird price must be less than the regular price.', 400)
          }
        }

        return data
      },
    ],
  },
  access: {
    read: () => true,
    create: ({ req }) => hasRole(req, ['admin', 'staff']),
    update: ({ req }) => hasRole(req, ['admin', 'staff']),
    delete: ({ req }) => hasRole(req, ['admin', 'staff']),
  },
}

export default Event
