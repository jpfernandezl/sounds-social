<template>
  <layout-with-sidebar>
    <div slot="header">
      <header-component :current="$route.params.id === 'me' ? 'profile' : 'sounds'"></header-component>
    </div>
    <div slot="main">
      <div v-if="getUser">
        <h1 class="f-headline mv3" v-text="getUser.username"></h1>
        <track-list-component v-if="profileUserId" :userId="profileUserId"></track-list-component>
      </div>
      <div v-if="!getUser">
        <div class="i">User not found</div>
      </div>
    </div>
    <div slot="sidebar">
      <div v-if="getUser">
        <div class="tc mv4">
          <div class="dib">
            <profile-image :source="profileAvatarImage"></profile-image>
          </div>
        </div>

        <div v-if="getUser.profile.description" v-text="getUser.profile.description" class="mt3 pl4 lh-copy">

        </div>

        <div v-if="getUser.profile.websiteUrl" class="mt3 pl4">
          <span class="b">Website: </span>
          <div class="mt2">
            <a class="link dark-blue" :href="getUser.profile.websiteUrl" v-text="getUser.profile.websiteUrl"></a>
          </div>
        </div>

        <div class="mv4 tc" v-if="!isCurrentUser">
          <button-component @click="getUser.isFollowedByCurrentUser ? unfollow(getUser._id) : follow(getUser._id)">
            <div>
              <div v-if="getUser.isFollowedByCurrentUser">Unfollow</div>
              <div v-if="!getUser.isFollowedByCurrentUser">Follow</div>
            </div>
          </button-component>
        </div>

        <div class="mv4 tc" v-if="isCurrentUser">
          <button-component @click="$router.push('/profile/' + getUser._id + '/edit')">Edit profile</button-component>
          <div class="dib dn-l">
            <button-component @click="authLogOut" color="gray">Logout</button-component>
          </div>
        </div>
      </div>
    </div>
  </layout-with-sidebar>
</template>
<script type="text/ecmascript-6">
  import gql from 'graphql-tag'
  import { getOr } from 'lodash/fp'

  import HeaderComponent from '../stateful/StatefulHeader.vue'
  import TrackListComponent from '../stateful/track/StatefulTrackList.vue'
  import { getUserId } from '../../api/AuthApi'
  import { follow, unfollow } from '../../api/ProfileApi'

  const query = gql`
    query ProfilePage($id: String!) {
      getUser(_id: $id) {
        _id
        username
        isFollowedByCurrentUser
        profile {
          description
          websiteUrl
          avatarFile {
            url
          }
        }
      }
    }
  `

  export default {
    components: {
      HeaderComponent,
      TrackListComponent,
    },
    data () {
      return {
        getUser: null,
        userId: '',
      }
    },
    mounted () {
      getUserId().then(id => {
        this.userId = id
      })
    },
    apollo: {
      getUser: {
        query,
        variables () {
          return { id: this.profileUserId }
        },
      },
    },
    computed: {
      isCurrentUser () {
        return this.profileUserId === this.userId
      },
      profileUserId () {
        const id = this.$route.params.id

        if (id === 'me') {
          return this.userId
        }

        return id
      },
      profileAvatarImage () {
        return getOr('http://tachyons.io/img/logo.jpg')('getUser.profile.avatarFile.url')(this)
      },
    },
    methods: {
      follow (userId) {
        follow(userId)
      },
      unfollow (userId) {
        unfollow(userId)
      },
    },
  }
</script>