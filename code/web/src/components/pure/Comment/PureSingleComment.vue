<template>
  <div>
    <div class="mv4">
      <div>
        <span class="gray" v-text="createdAtAgo"></span>
        <router-link :to="'/profile/' + userId" class="dib link gray f5">
          <span v-text="$t('by')"></span> <span v-text="userDisplayName"></span>
        </router-link>
      </div>

      <div class="mt3 f4" v-text="content"></div>

      <div v-if="isRemovable" class="mt3">
        <pure-button color="red" @click="$emit('remove')" v-text="$t('Remove')"></pure-button>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    props: {
      userId: {
        type: String,
      },
      userDisplayName: {
        type: String,
      },
      createdAt: {
        type: String,
      },
      content: {
        type: String,
      },
      isEditable: {
        type: Boolean,
      },
      isRemovable: {
        type: Boolean,
      },
    },
    computed: {
      createdAtAgo () {
        return moment(new Date(this.createdAt)).fromNow()
      },
    },
  }
</script>
