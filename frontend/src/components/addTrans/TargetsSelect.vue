<template>
<div :class="$style['targets']">
  <div :class="$style['section-label']"> Targets </div>
  <div :class="$style['input-items']">
    <div v-for="(target, index) in targets " :key="index" :class="$style['input-item']">
        <TargetInput
          :users="users"
          :targets="targets"
          :index="index"
          :curProperty="curProperty"
          :splitType="splitType"
          @remove="$emit('remove', index)"
        />
    </div>
    <div :class="[$style['add-user'], 'noselect']">
        <i @click="$emit('add')"> add </i>
    </div>
  </div>
</div>
</template>


<script>
// Components
import TargetInput from './TargetInput.vue'

export default {
  name: 'TargetsSelect',
  components: {
    TargetInput
  },
  props: ['targets', 'users', 'curProperty', 'splitType'],
  methods: {
    addTarget() {
      if (this.users.length > 0) {
        if (this.splitType === 'equally') {
          this.targets = this.targets.map(target => ({user: target.user, value: target.value, equalValue: this.sumOfSources / (this.targets.length + 1)}))
          this.targets.push( {user: this.users[0], value: 0, equalValue: this.sumOfSources / (this.targets.length + 1)} )
        }
        else
          this.targets.push( {user: this.users[0], value: 0, equalValue: 0} )
      }
    },
    removeTarget(index) {
      this.targets.splice(index, 1);
    }
  }
}
</script>


<style module>
.targets {
  width: 330px;
  min-height: 48%;
  max-height: 48%;

  color: white;

  display: flex;
  flex-direction: column;

  overflow: hidden;
}

.section-label {
  letter-spacing: 1px;
  margin-bottom: 5px;
  color: rgb(167, 167, 167);
}

.input-items {
  max-height: inherit;
  min-height: inherit;

  display: flex;
  flex-direction: column;

  align-items: center;
  overflow: scroll;
}

.add-user {
  color: rgb(230, 172, 96);
  margin-top: 10px;
  margin-bottom: 5px;
}

::-webkit-scrollbar {
  display: none;
}
</style>
