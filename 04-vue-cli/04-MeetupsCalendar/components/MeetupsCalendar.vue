<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button class="calendar-view__control-left" @click="getPreviousMonth" type="button" aria-label="Previous month"></button>
        <div class="calendar-view__date">{{ currentDateToDisplay }}</div>
        <button class="calendar-view__control-right" @click="getNextMonth" type="button" aria-label="Next month"></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <div v-for="day in previousMonthDays" :key="day" class="calendar-view__cell calendar-view__cell_inactive" tabindex="0">
        <div class="calendar-view__cell-day">{{ day }}</div>
        <div class="calendar-view__cell-content"></div>
      </div>
      <div v-for="n in currentMonthDays" :key="n" class="calendar-view__cell" tabindex="0">
        <div class="calendar-view__cell-day">{{ n }}</div>
        <div class="calendar-view__cell-content">
          <a v-for="meetup in getMeetupsOfTheDay(n)"
            :key="meetup.date"
            :href="`/meetups/${meetup.id}`"
            class="calendar-event"
          >
          {{ meetup.title }}</a>
        </div>
      </div>
      <div v-for="day in nextMonthDays" :key="day" class="calendar-view__cell calendar-view__cell_inactive" tabindex="0">
        <div class="calendar-view__cell-day">{{ day }}</div>
        <div class="calendar-view__cell-content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeetupsCalendar',

  data() {
    return {
      date: new Date(),
    };
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  computed: {
    currentDateToDisplay() {
      return this.date.toLocaleDateString(navigator.language, {
        month: 'long',
        year: 'numeric',
      });
    },

    currentMonth() {
      return this.date.getMonth() + 1;
    },

    currentYear() {
      return this.date.getFullYear();
    },

    currentMonthDays() {
      return new Date(this.currentYear, this.currentMonth, 0).getDate();
    },

    currentMonthFirstWeekDayNumber() {
      const weekDay = new Date(this.currentYear, this.currentMonth - 1, 1).getDay();
      return weekDay === 0 ? 7 : weekDay;
    },

    currentMonthLastWeekDayNumber() {
      const weekDay = new Date(this.currentYear, this.currentMonth, 0).getDay();
      return weekDay === 0 ? 7 : weekDay;
    },

    previousMonthDays() {
      const previousMonthDaysNumber = new Date(this.currentYear, this.currentMonth - 1, 0).getDate();
      const arr = [];
      for (let i = 0; i < this.currentMonthFirstWeekDayNumber - 1; i++) {
        arr.push(previousMonthDaysNumber - i)
      }
      return arr.reverse();
    },

    nextMonthDays() {
      const arr = [];
      for (let i = 1; i < 8 - this.currentMonthLastWeekDayNumber; i++) {
        arr.push(i)
      }
      return arr;
    },

    meetupsInCurrentMonth() {
      return this.meetups.filter(meetup => {
        return new Date(meetup.date).getMonth() + 1 === this.currentMonth &&
               new Date(meetup.date).getFullYear() === this.currentYear;
      })
    },
  },

  methods: {
    getPreviousMonth() {
      this.date = new Date(this.date.setMonth(this.currentMonth - 2, 1));
    },

    getNextMonth() {
      this.date = new Date(this.date.setMonth(this.currentMonth, 1));
    },

    getMeetupsOfTheDay(n) {
      return this.meetupsInCurrentMonth.filter(meetup => new Date(meetup.date).getDate() === n)
    }
  },
};
</script>

<style scoped>
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
