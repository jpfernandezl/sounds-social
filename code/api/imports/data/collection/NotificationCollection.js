import { Mongo } from 'meteor/mongo'
import { isValidNotificationType } from '../Type/NotificationTypes'
import { isValidUserReferenceType } from '../Type/UserReferenceTypes'
import { isValidNotificationReferenceType } from '../Type/NotificationReferenceTypes'
import { createdAtAutoValue } from './autoValue/createdAtAutoValue'

const notificationSchema = new SimpleSchema({
  notificationType: {
    type: String,
  },
  referenceType: {
    type: String,
  },
  referenceId: {
    type: String,
  },
  userId: {
    type: String,
  },
  authorId: {
    type: String,
  },
  authorReferenceType: {
    type: String,
  },
  createdAt: {
    type: Date,
    autoValue: createdAtAutoValue,
  },
})

class NotificationCollection extends Mongo.Collection
{
  addNotification(notificationType, referenceType, referenceId, authorReferenceType, authorId, userId) {
    if (isValidNotificationType(notificationType)
        && isValidNotificationReferenceType(referenceType)
        && isValidUserReferenceType(authorReferenceType)) {

      this.insert({
        notificationType,
        referenceType,
        referenceId,
        authorReferenceType,
        authorId,
        userId,
      })
    }
  }

  findForUser(userId, limit) {
    return this.find({ userId }, {
      sort: { createdAt: -1 },
      limit,
    })
  }
}

export const notificationCollection = new NotificationCollection('notification')

notificationCollection.attachSchema(notificationSchema)
