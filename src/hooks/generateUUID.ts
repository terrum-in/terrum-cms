import type { FieldHook } from 'payload'
import { v4 as uuidv4 } from 'uuid'

export const generateUUID: FieldHook = ({ value }) => value || uuidv4()
