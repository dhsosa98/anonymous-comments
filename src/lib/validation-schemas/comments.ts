import { AnySchemaObject } from "ajv"

const CommentProperties = {
  name: {type: "string"},
  comment: {type: "string"},
  likes: {type: "integer"},
  dislikes: {type: "integer"},
  usersLiked: {type: "array"},
  usersDisliked: {type: "array"},
}
const CreateCommentValidationSchema: AnySchemaObject = {
    properties: {
      ...CommentProperties
    },
    required: ["comment"]
} as const


const LikeOrDislikeCommentValidationSchema: AnySchemaObject = {
  properties: {
    isLiked: {type: "boolean"},
    isDisliked: {type: "boolean"},
  },
  required: []
} as const

export type LikeOrDislikeCommentValidationSchema = typeof LikeOrDislikeCommentValidationSchema

export type CreateCommentValidationSchema = typeof CreateCommentValidationSchema

export {
  CreateCommentValidationSchema,
  LikeOrDislikeCommentValidationSchema
}
