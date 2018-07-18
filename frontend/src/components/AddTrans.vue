<template>
<div :class="$style['add-trans']">
  <div :class="$style['inputs']">
    <Title :title.sync="title"/>

    <typeSelection :splitType.sync="splitType" />

    <div :class="$style['users-section']">
        <SourcesSelect
            :sources="sources"
            :users="users"
            @remove="removeSource"
            @add="addSource"
        />

        <TargetsSelect
            :targets="targets"
            :users="users"
            :curProperty="currentTargetProperty"
            :splitType="splitType"
            @remove="removeTarget"
            @add="addTarget"
        />
    </div>
  </div>

  <transition name="add-button-move">
    <add-button v-if="warningProperty.show === false" label="Add" @click="addTrans"/>
  </transition>

  <transition name="warning-move">
    <Warning
      :show="warningProperty.show"
      :message="warningProperty.msg"
    />
  </transition>
</div>
</template>


<script>
// components
import SourcesSelect from './addTrans/SourcesSelect.vue'
import TargetsSelect from './addTrans/TargetsSelect.vue'
import TypeSelection from './addTrans/TypeSelection.vue'
import AddButton from '../helper/components/AddButton.vue'
import Warning from '../helper/components/Warning.vue'
import Title from './addTrans/Title.vue'
// helper
import { extractUniqueLists, simplifyTransLists, extractPaymentsAndBuildTransObject } from '../helper/functions/transactionBuilder.js'

// W
const { R } = window


export default {
  name: 'AddTrans',

  props: ['users', 'wisId'],

  components: {
    SourcesSelect,
    TargetsSelect,
    TypeSelection,
    AddButton,
    Warning,
    Title
  },

  data: () => ({
    sources: [], // {user, value}
    targets: [], // {user, value, equalValue}
    title: '',
    splitType: 'equally'
  }),

  watch: {
      sumOfSources () {
        this.targets = this.targets.map(target => ({
            user: target.user,
            value: target.value,
            equalValue: this.sumOfSources / this.targets.length}))
      },
  },

  computed: {
      warningProperty() {
          if (!this.title.trim())
              return ({ show: true, msg: 'Enter transaction title!' })
          if (this.splitType === 'unequally' && this.sumOfSources != this.sumOfTargets)
              return ({ show: true, msg: 'Sum of sources and targets are not equal !' })
          if (!this.resultTrans || !this.resultTrans.payments.length)
              return ({ show: true, msg: 'No payment needed sofar!' })
          return ({ show: false, msg: '' })
      },

      sumOfSources() { return R.sum(R.pluck('value', this.sources)) },

      sumOfTargets() { return R.sum(R.pluck('value', this.targets)) },

      currentTargetProperty() { return (this.splitType === 'unequally') ? 'value' : 'equalValue' },

      resultTrans() {
        const transBuilder = R.compose(extractPaymentsAndBuildTransObject(this.title, this.wisId),
                             simplifyTransLists,
                             extractUniqueLists(this.users, this.currentTargetProperty))
        
        return transBuilder(this.sources, this.targets)
      },
  },

  methods: {
    changeEqualValueTarget() {
      this.targets = R.map(({ user, value }) => ({
        user,
        value,
        equalValue: this.sumOfSources / (this.targets.length),
      }), this.targets)
    },

    addTrans() { this.$emit('addTrans', this.resultTrans) },

    addTarget() {
      if (this.users.length) {
        if (this.splitType === 'equally') {
          this.targets.push({
            user: this.users[0],
            value: 0,
            equalValue: this.sumOfSources / (this.targets.length + 1),
          })
          this.changeEqualValueTarget()
        }
        else this.targets.push( {user: this.users[0], value: 0, equalValue: 0} )
      }
    },

    removeTarget(index) {
      this.targets.splice(index, 1)
      this.changeEqualValueTarget()
    },

    addSource() { if (this.users.length) this.sources.push({ user: this.users[0], value: 0 }) },

    removeSource(index) { this.sources.splice(index, 1) },
  }
}
</script>


<style module>
.add-trans {
  width: 350px;
  height: calc(100% - 50px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-content: space-around;
  overflow-x: hidden;
  overflow-y: hidden;
  background: lightgray;
  position: absolute;
  top: 50px;
}

.users-section {
  width: 330px;
  height: 100%;
}

.inputs {
  width: 350px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: space-around;
  overflow: hidden;
  background: rgb(73, 73, 73);
}

::-webkit-scrollbar {
  display: none;
}


</style>
