import { CollectionConfig } from 'payload'

const RecyclingItems: CollectionConfig = {
  slug: 'recycling-items',
  labels: {
    singular: 'Recycling Item',
    plural: 'Recycling Items',
  },
  admin: {
    useAsTitle: 'itemName',
    defaultColumns: ['itemName', 'canBeRecycled', 'isDryWaste', 'isWetWaste', 'isHazardousWaste'],
  },
  fields: [
    {
      name: 'itemName',
      type: 'text',
      required: true,
      label: 'Item Name',
    },
    {
      name: 'canBeRecycled',
      type: 'checkbox',
      label: 'Can be Recycled?',
      required: true,
      defaultValue: false,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'tip',
      type: 'text',
      label: 'Recycling Tip',
    },
    {
      name: 'isDryWaste',
      type: 'checkbox',
      label: 'Dry Waste',
      defaultValue: false,
    },
    {
      name: 'isWetWaste',
      type: 'checkbox',
      label: 'Wet Waste',
      defaultValue: false,
    },
    {
      name: 'isHazardousWaste',
      type: 'checkbox',
      label: 'Hazardous Waste',
      defaultValue: false,
    },
  ],
  hooks: {
    beforeValidate: [
      async ({ data }) => {
        if (!data) return data

        const { isDryWaste, isWetWaste, isHazardousWaste } = data

        // Ensure only one is true at a time
        const truthy = [isDryWaste, isWetWaste, isHazardousWaste].filter(Boolean)
        if (truthy.length > 1) {
          throw new Error('Only one of Dry, Wet, or Hazardous waste can be true')
        }

        return data
      },
    ],
  },
}

export default RecyclingItems