import '../App.vue'
import '../startup/StartupRegisterPureComponents'
import '../startup/StartupI18N'
import '../startup/StartupVueSelect'
import '../startup/StartupAuthMixin'
import '../startup/StartupLodashPlugin'
import '../startup/StartupPopover'
import '../store'

import { buttonStories } from './ButtonStory'
import { titleStories } from './TitleStory'
import { errorStories } from './ErrorStory'
import { headerStories } from './HeaderStory'
import { identityHeaderStories } from './IdentityHeaderStory'
import { modalStories } from './ModalStory'
import { confirmModalStories } from './ConfirmModalStory'
import { confirmModalButtonStories } from './ConfirmModalButtonStory'
import { selectStories } from './SelectStory'
import { soundPlayerStories } from './SoundPlayerStory'
import { soundStories } from './SoundStory'
import { soundFormBoxStories } from './SoundFormBoxStory'
import { iconStories } from './IconStory'
import { loaderStories } from './LoaderStory'

buttonStories(module)
titleStories(module)
errorStories(module)
headerStories(module)
identityHeaderStories(module)
selectStories(module)
iconStories(module)
modalStories(module)
confirmModalStories(module)
confirmModalButtonStories(module)
soundStories(module)
soundFormBoxStories(module)
soundPlayerStories(module)
loaderStories(module)
