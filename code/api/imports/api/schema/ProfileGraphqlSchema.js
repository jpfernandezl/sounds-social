import { check } from 'meteor/check'
import { profileCollection } from '../../data/collection/ProfileCollection'
import { fileCollection } from '../../data/collection/FileCollection'

const typeDef = `
input ProfileData {
  websiteUrl: String
  description: String
  avatarFile: FileData
  language: String
}

type Profile {
  type: String
  description: String
  websiteUrl: String
  description: String
  avatarFile: File
  language: String
}

extend type Mutation {
  updateUserProfile(profileData: ProfileData!): Profile
}
`

export default {
  typeDefs: [typeDef],
  resolvers: {
    Profile: {
      avatarFile(root) {
        return fileCollection.findOneById(root.avatarFileId)
      },
      language(root) {
        return root.language || 'en'
      },
    },
    Mutation: {
      updateUserProfile(root, args, context) {
        check(context.userId, String)

        profileCollection.updateProfile(
          context.userId,
          'user',
          args.profileData,
        )

        return profileCollection.findOneUserProfile(context.userId)
      },
    },
  },
}
