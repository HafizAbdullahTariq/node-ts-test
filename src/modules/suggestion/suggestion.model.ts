import mongoose from 'mongoose'

import mongooseService from '../../common/services/mongoose.service'

export const collectionName = 'Suggestion'
const mongooseObj: typeof mongoose = mongooseService.getMongoose()

export type comparePasswordCallback = (err: unknown, isMatch: boolean) => void

export class SuggestionClass {
  constructor(
    public id: number,
    public name: string,
    public ascii: string,
    public alt_name: string,
    public lat: number,
    public long: number,
    public admin1: number,
    public population: number,
    public dem: number,
    public feat_class: string,
    public feat_code: string,
    public country: string,
    public cc2: string,
    public admin2: string,
    public admin3: string,
    public admin4: string,
    public elevation: string,
    public tz: string,
    public modified_at: string
  ) {}
}

export const suggestionSchema = new mongooseObj.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    ascii: { type: String },
    alt_name: { type: String },
    lat: { type: Number },
    long: { type: Number },
    admin1: { type: Number },
    population: { type: Number },
    dem: { type: Number },
    feat_class: { type: String },
    feat_code: { type: String },
    country: { type: String },
    cc2: { type: String },
    admin2: { type: String },
    admin3: { type: String },
    admin4: { type: String },
    elevation: { type: String },
    tz: { type: String },
    location: { type: Object },
    modified_at: { type: String }
  },
  {
    timestamps: false
  }
)
suggestionSchema.index({ location: '2dsphere' })
export interface SuggestionDocument extends SuggestionClass, Document {}

export const suggestionModel = mongooseService
  .getMongoose()
  .model<SuggestionDocument>(collectionName, suggestionSchema)
