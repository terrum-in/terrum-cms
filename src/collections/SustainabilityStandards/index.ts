import { CollectionConfig } from "payload";

const SustainabilityStandards: CollectionConfig = {
  slug: 'sustainability-standards',
  labels: {
    singular: 'Sustainability Standard',
    plural: 'Sustainability Standards',
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
      maxLength: 128,
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
    },
  ],
}

export default SustainabilityStandards;