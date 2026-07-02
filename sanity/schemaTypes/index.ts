import type { SchemaTypeDefinition } from "sanity"
import { post } from "./post"
import { event } from "./event"
import { realisation } from "./realisation"
import { testimonial } from "./testimonial"
import { author } from "./author"
import { category } from "./category"
import { blockContent } from "./blockContent"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, event, realisation, testimonial, author, category, blockContent],
}
