import { SuggestionDto } from './suggestion.dto'
import * as SuggestionModel from './suggestion.model'

class SuggestionDao {
  suggestionSchema = SuggestionModel.suggestionSchema
  suggestionModel = SuggestionModel.suggestionModel

  async searchSuggestion(
    body: SuggestionDto
  ): Promise<{ suggestions: SuggestionModel.SuggestionDocument[] }> {
    console.log('suggs', body)

    const matchObj = {}
    const pipeline = []
    if (body.q) matchObj.name = new RegExp('^' + body.q)

    if (body.latitude && body.longitude && body.radius) {
      pipeline.push({
        $geoNear: {
          near: [+body.longitude, +body.latitude],
          distanceField: 'distance',
          spherical: true,
          maxDistance: +body.radius * 1000,
          distanceMultiplier: 6378.1 // convert radians to kilometers
        }
      })
    }
    pipeline.push({ $match: matchObj })
    pipeline.push({
      $project: {
        name: 1,
        latitude: '$lat',
        longitude: '$long',
        distance: 1
      }
    })
    const suggs = await this.suggestionModel.aggregate(pipeline)
    console.log('suggs', suggs)
    return { suggestions: suggs }
  }
  async migrate() {
    await this.suggestionModel.aggregate([
      {
        $match: { location: { $exists: false } }
      },
      {
        $addFields: {
          location: { type: 'Point', coordinates: ['$long', '$lat'] }
        }
      },
      {
        $merge: { into: 'suggestions' }
      }
    ])
    try {
      this.suggestionSchema.index({ location: '2dsphere' })
      this.suggestionModel.syncIndexes()
    } catch (error) {
      console.log('Index Error', error)
    }
    return { ok: true }
  }
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    var radlat1 = (Math.PI * lat1) / 180
    var radlat2 = (Math.PI * lat2) / 180
    var theta = lon1 - lon2
    var radtheta = (Math.PI * theta) / 180
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
    dist = Math.acos(dist)
    dist = (dist * 180) / Math.PI
    dist = dist * 60 * 1.1515
    // if (unit=="K") { dist = dist * 1.609344 }
    // if (unit=="N") { dist = dist * 0.8684 }
    return dist * 1.609344
    return dist
  }
}

export default new SuggestionDao()
