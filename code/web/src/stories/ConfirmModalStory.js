import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'

export const confirmModalStories = moduleArg => storiesOf('Pure Confirm Modal', moduleArg)
  .add('with text', () => ({
    methods: { confirm: action('confirmed!'), abort: action('aborted!') },
    template: `
<confirm-modal @confirm="confirm" @abort="abort">
  Do you really want to delete this?
</confirm-modal>`,
  }))
  .add('with icon', () => ({
    methods: { confirm: action('confirmed!'), abort: action('aborted!') },
    template: `
<confirm-modal @confirm="confirm" @abort="abort" icon="trash-o">
  Do you really want to <span class="b">delete</span> this?
</confirm-modal>`,
  }))
