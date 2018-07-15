<template>
<div :class="$style['add-trans']" 
    :style="curHeight">
  <div :class="$style['inputs']"> 
    <Title :title.sync="title"/>
    <div :class="$style['type-section']">
        <span :class="$style['split-caption']"> split type </span>
        <div :class="$style['types']">
        <div :class="[$style['split-type'], 'noselect']" @click="splitType = 'equally'"> 
            <div :class="[$style['checkbox'], splitType == 'equally' ? $style['selected'] : $style['unselected']]"/>
            <span :class="$style['split-label']"> Equally </span> 
        </div>
        <div :class="[$style['split-type'], 'noselect']" @click="splitType = 'unequally'"> 
            <div :class="[$style['checkbox'], splitType == 'unequally' ? $style['selected'] : $style['unselected']]"/>
            <span :class="$style['split-label']"> UnEqually </span> 
        </div>
        </div>
    </div>
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
        :curProperty="curTargetProperty"
        :splitType="splitType"
        @remove="removeTarget"
        @add="addTarget"
    />
    </div>
  </div>

  <transition name="warning-move">
    <add-button v-if="warning.show === false" label="Add" @click="addTrans"/>
  </transition>
  <transition name="add-button-move">
    <div v-if="warning.show === true" :class="$style['warning']">
        <span> <i> warning </i> </span>
        <span :class="$style['warning-text']"> {{ warning.msg }} </span>
    </div>
  </transition>
</div>
</template>


<script>
// components
import AddButton from '../helper/components/AddButton.vue'
import SourcesSelect from './addTrans/SourcesSelect.vue'
import TargetsSelect from './addTrans/TargetsSelect.vue'
import Title from './addTrans/Title.vue'
// W
const { R } = window


export default {
  name: 'AddTrans',
  props: ['users', 'wisId'],
  components: {
    AddButton,
    SourcesSelect,
    TargetsSelect,
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
      warning() {
          if (this.title.trim() === '') 
              return ({show: true, msg: 'Enter transaction title!'})
          if (this.splitType === 'unequally' && this.sumOfSources != this.sumOfTargets)
              return ({show: true, msg: 'Sum of sources and targets are not equal !'})
          return ({show: false, msg: ''})
      },
      sumOfSources() {
          return R.sum(R.map(source => source.value, this.sources))
      },
      sumOfTargets() {
          return R.sum(R.map(target => target.value, this.targets))
      },
      curTargetProperty() {
          return (this.splitType === 'unequally') ? 'value' : 'equalValue' 
      },
      resultTrans() {
        let uniqueSources = R.filter(source => source.value != 0, R.map(name => ({ user: name,
        value: R.sum(R.map(user => user.value, R.filter(src => src.user == name, this.sources)))
        }), this.users))
    
        let uniqueTargets = R.filter(target => target.value != 0, R.map(name => ({ user: name,
        value: R.sum(R.map(user => user[this.curTargetProperty], R.filter(tar => tar.user == name, this.targets)))
        }), this.users))

        R.forEach(src => {
            const srcIndex = R.findIndex(source => source.user == src.user, uniqueSources)
            const tarIndex = R.findIndex(target => target.user == src.user, uniqueTargets)
            
            if (srcIndex >= 0 && tarIndex >= 0) {
                if (uniqueSources[srcIndex].value >= uniqueTargets[tarIndex].value) {
                    uniqueSources[srcIndex].value -= uniqueTargets[tarIndex].value
                    uniqueTargets[tarIndex].value = 0
                } else {
                    uniqueTargets[tarIndex].value -= uniqueSources[srcIndex].value
                    uniqueSources[srcIndex].value = 0
                }
            }
        }, uniqueSources)

        const finalSources = R.filter(source => source.value != 0, uniqueSources)
        const finalTargets = R.filter(target => target.value != 0, uniqueTargets)
        const sumOfFinalSources = R.sum(R.map(src => src.value, finalSources))

        let payments = []
        R.forEach(target => {
            const ownings = R.map(src => ({from: target.user, to: src.user, value: src.value / sumOfFinalSources * target.value}), finalSources)
            payments = R.insertAll(0, ownings, payments)
        }, finalTargets)
        
        return ({
            title: this.title,
            sources: finalSources,
            payments: payments,
            wisId: this.wisId
        })
      },
      curHeight() {
          return {height: document.getElementsByClassName("add-trans").offsetWidth + -100 + "px"}
      }
  },
  methods: {
    addTrans() {
        this.$emit('addTrans', this.resultTrans)
    },
    addTarget() {
        if (this.users.length > 0) {
            if (this.splitType === 'equally') {
                this.targets.push( {user: this.users[0], value: 0, equalValue: this.sumOfSources / (this.targets.length + 1)} )
                this.targets = this.targets.map(target => ({user: target.user, value: target.value, equalValue: this.sumOfSources / (this.targets.length)}))
            }
            else
                this.targets.push( {user: this.users[0], value: 0, equalValue: 0} )
        }
    },
    removeTarget(index) {
        this.targets.splice(index, 1);
        this.targets = this.targets.map(target => ({user: target.user, value: target.value, equalValue: this.sumOfSources / (this.targets.length)}))
    },
    addSource() {
        if (this.users.length > 0)
        this.sources.push( {user: this.users[0], value: 0} )
    },
    removeSource(index) {
        this.sources.splice(index, 1);
    }
  }
}
</script>


<style module>
.add-trans {
  width: 350px;
  height: calc(100% - 100px);
  
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

.warning {
  width: 320px;
  min-height: 50px;

  display: flex;
  flex-direction: row;
  
  align-items: center;

  background: #e42b2b;
  color: white;

  padding: 0 15px;

  position: fixed;
  bottom: 0;
}

.warning-text {
  max-width: 250px;
  padding-left: 15px;
}

::-webkit-scrollbar {
  display: none;
}

.type-section {
  width: 330px;
  min-height: 40px;

  color: white;

  display: flex;
  flex-direction: row;

  margin-bottom: 10px;

  position: relative;
  bottom: 0px;
}

.types {
  display: flex;
  flex-direction: row;

  max-height: 20px;
}

.split-type {
  margin-left: 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
}

.split-caption {
  letter-spacing: 1px;
  margin-bottom: 5px;
  color: rgb(167, 167, 167);
}

.split-label {
  letter-spacing: 1px;
  color: rgb(240, 237, 206);
  font-size: 14px;
}

.checkbox.unselected {
    width: 15px;
    height: 16px;

    border: 1px solid rgb(240, 189, 21);
    border-radius: 5px;

    margin-right: 5px;

    cursor: pointer;

    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
}
.checkbox.selected {
    width: 15px;
    height: 16px;
    
    background: rgb(240, 189, 21);
    border: 1px solid rgb(240, 189, 21);
    border-radius: 5px;

    margin-right: 5px;

    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
}
</style>
