import { get } from 'lodash/fp'
import { Meteor } from 'meteor/meteor'
import { Index, MongoDBEngine } from 'meteor/easysearch:core'
import { trackCollection } from '../collection/TrackCollection'
import { findRelatedFieldDocuments } from './findRelatedFieldDocuments'

const searchByUsername = (config, query, cb) => findRelatedFieldDocuments({
  collection: trackCollection,
  selector: config.selectorPerField('aggregatedAuthor.username', query),
  from: Meteor.users.rawCollection().collectionName,
  localField: 'creatorId',
  foreignField: '_id',
  as: 'aggregatedAuthor',
})

export const soundSearchIndex = new Index({
  collection: trackCollection,
  fields: ['name', 'description'],
  engine: new MongoDBEngine({
    selector: function (...args) {
      const defaultConfig = this.defaultConfiguration()
      const selector = defaultConfig.selector(...args)

      const [queryObject] = args

      selector.$or.push({
        _id: {
          $in: searchByUsername(defaultConfig, queryObject.name).map(get('_id')),
        },
      })
      selector.isPublic = true

      return selector
    }
  }),
})