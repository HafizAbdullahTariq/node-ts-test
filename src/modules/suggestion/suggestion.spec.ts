import { describe, it, before } from 'mocha'
import * as SuggestionModel from './suggestion.model'
import suggestionDao from './suggestion.dao'
import { expect } from 'chai'

before(async () => {
  await SuggestionModel.suggestionModel.insertMany([
    {
      id: 6058560,
      name: 'London',
      ascii: 'London',
      alt_name:
        'London,Londonas,Londono,YXU,leondeon,lndn,lndn, antaryw,londoni,lun dui,lun dun,lwndwn,rondon,Лондон,לונדון,لندن,لندن، انتاریو,لندن، اونٹاریو,ლონდონი,ロンドン,伦敦,런던',
      lat: 42.98339,
      long: -81.23304,
      feat_class: 'P',
      feat_code: 'PPL',
      country: 'CA',
      cc2: '',
      admin1: 8,
      admin2: '',
      admin3: '',
      admin4: '',
      population: 346765,
      elevation: '',
      dem: 252,
      tz: 'America/Toronto',
      modified_at: '2012-08-19'
    },
    {
      id: 5885280,
      name: 'Angus',
      ascii: 'Angus',
      alt_name: '',
      lat: 44.31681,
      long: -79.88295,
      feat_class: 'P',
      feat_code: 'PPLL',
      country: 'CA',
      cc2: '',
      admin1: 8,
      admin2: '',
      admin3: '',
      admin4: '',
      population: 10269,
      elevation: '',
      dem: 193,
      tz: 'America/Toronto',
      modified_at: '2006-01-27'
    }
  ])
})
describe('GET /suggestions', () => {
  it('create location field in collection', async () => {
    await suggestionDao.migrate()
  })
  it('returns an empty array of suggestions because of invalid city', async () => {
    const response = await suggestionDao.searchSuggestion({
      q: 'SomeRandomCityInTheMiddleOfNowhere'
    })
    expect(response.suggestions).to.be.instanceof(Array)
    expect(response.suggestions).to.have.length(0)
  })
  it('returns an empty array of suggestions', async () => {
    const response = await suggestionDao.searchSuggestion({
      q: 'Londo',
      latitude: 43.70011,
      longitude: -79.4163,
      radius: 5,
      sort: 'distance'
    })
    expect(response.suggestions).to.be.instanceof(Array)
    expect(response.suggestions).to.have.length(1)
  })
})
