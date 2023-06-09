import { defineComponent } from '../vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from '../meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',

  agendaItemIcons: agendaItemIcons,

  agendaItemDefaultTitles: agendaItemDefaultTitles,

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  computed: {
    iconSrc() {
      const iconName = agendaItemIcons[this.agendaItem.type];
      return `/assets/icons/icon-${iconName}.svg`
    },

    title() {
      return this.agendaItem.title ? this.agendaItem.title : agendaItemDefaultTitles[this.agendaItem.type]
    },
  },

  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img :src="iconSrc" class="icon" :alt="agendaItem.type" />
      </div>
      <div class="agenda-item__col">{{ agendaItem.startsAt + ' - ' + agendaItem.endsAt }}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">{{ title }}</h3>
        <p class="agenda-item__talk" v-if="agendaItem.type === 'talk'">
          <span>{{ agendaItem.speaker }}</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{ agendaItem.language }}</span>
        </p>
        <p v-if="agendaItem.description">{{ agendaItem.description }}</p>
      </div>
    </div>`,
});
