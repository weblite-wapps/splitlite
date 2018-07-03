<template>
<div :class="$style['add-trans']">
  <div :class="$style['inputs']"> 
      <div :class="$style['title']"> 
        <span :class="$style['title-label']"> Title : </span>
        <input :class="$style['title-input']" v-model="title"/>
      </div>
      <div :class="$style['sources']">
          <div :class="$style['section-label']"> Sources : </div>
          <div :class="$style['input-items']">
            <div v-for="(source, index) in sources" :key="index" :class="$style['input-item']">
                <div :class="$style['user-select']"> 
                    <select v-model="sources[index].user">
                        <option
                        v-for="(user, selectIndex) in users" 
                        :value="user"
                        :key="selectIndex">
                            {{ user }}
                        </option>
                    </select>
                </div>
                <div :class="$style['value-input']">
                    <input v-model="sources[index].value" type="number"/>
                </div>
            </div>
            <div :class="$style['add-user']">
                <i @click="addSource()"> add </i>
            </div>
          </div>
      </div>
      <div :class="$style['targets']">
          <div :class="$style['section-label']"> Targets : </div>
          <div :class="$style['input-items']">
            <div v-for="(target, index) in targets " :key="index" :class="$style['input-item']">
                <div :class="$style['user-select']"> 
                    <select v-model="targets[index].user">
                        <option
                        v-for="(user, selectIndex) in users" 
                        :value="user"
                        :key="selectIndex">
                            {{ user }}
                        </option>
                    </select>
                </div>
                <div :class="$style['value-input']">
                    <input v-model="targets[index][curTargetProperty]" type="number" :readonly="splitType === 'equally'"/>
                </div>
            </div>
            <div :class="$style['add-user']">
                <i @click="addTarget()"> add </i>
            </div>
          </div>
      </div>

      <div :class="$style['type-section']">
          <span :class="$style['split-caption']"> split type : </span>
          <div :class="$style['types']">
            <div :class="$style['split-type']"> 
                <input type="radio" id="equally" value="equally" v-model="splitType"/> Equally 
            </div>
            <div :class="$style['split-type']"> 
                <input type="radio" id="unequally" value="unequally" v-model="splitType"/> Unequally
            </div>
          </div>
      </div>
  </div>

  <add-button v-if="showWarning === false" label="Add"/>
  <div v-else :class="$style['warning']">
    <span> <i> warning </i> </span>
    <span :class="$style['warning-text']"> {{ warningMsg }} </span>
  </div>
</div>
</template>


<script>
// components
import AddButton from '../helper/components/AddButton.vue'
// W
const { R } = window


export default {
  name: 'AddTrans',
  props: ['users'],
  components: {
    AddButton
  },
  data: () => ({
    sources: [], // {user, value}
    targets: [], // {user, value, equalValue}

    title: 'Weblite Lunch',
    splitType: 'unequally',
    
    warningMsg: ''
  }),
  watch: {
      sumOfSources () {
        this.targets = this.targets.map(target => ({user: target.user, value: target.value, equalValue: this.sumOfSources / this.targets.length}))
      },
  },
  computed: {
      showWarning () {
          if (this.title.trim() === '') {
              this.warningMsg = 'Enter Title first !'
              return true
          }
          if (this.splitType === 'unequally' && this.sumOfSources != this.sumOfTargets) {
              this.warningMsg = 'Sum of sources and targets are not equal !'
              return true
          }

          return false
      },
      sumOfSources() {
          const sum = R.sum(this.sources.map(source => source.value))
          return sum
      },
      sumOfTargets() {
          return R.sum(this.targets.map(target => target.value))
      },
      curTargetProperty() {
          return (this.splitType === 'unequally') ? 'value' : 'equalValue' 
      }
  },
  methods: {
      addSource() {
          if (this.users.length > 0)
            this.sources.push( {user: this.users[0], value: 0} )
      },
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
      emitTrans() {
          // some proning

          // build transaction object
          
      }
  }
}
</script>


<style module>
.add-trans {
  width: 350px;
  height: 100%;
  display: flex;
  flex-direction: column;

  align-items: flex-start;
  align-content: space-around;

  overflow-x: hidden;
  overflow-y: scroll;

  background: lightgray;
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
  width: 350px;
  min-height: 50px;

  display: flex;
  flex-direction: row;
  
  align-items: center;

  background: #e42b2b;
  color: white;

  padding: 0 15px;
}

.warning-text {
  max-width: 250px;
  padding-left: 15px;
}

::-webkit-scrollbar {
  display: none;
}

.title {
  width: 330px;
  min-height: 40px;

  color: white;

  border: none;
  border-bottom: 1px rgba(143, 143, 143, 0.637) solid;

  display: flex;
  flex-direction: row;
  align-items: center;

  margin: 10px;
  padding-bottom: 2px;
}

.title-input {
  width: 272px;
  margin-left: 10px;
}

.sources {
  width: 330px;
  min-height: 35%;
  max-height: 35%;

  color: white;
  border: none;
  border-bottom: 1px rgba(143, 143, 143, 0.637) solid;

  display: flex;
  flex-direction: column;

  margin-bottom: 10px;

  overflow: scroll;
}

.targets {
  width: 330px;
  min-height: 43%;
  max-height: 43%;

  color: white;
  border: none;
  border-bottom: 1px rgba(143, 143, 143, 0.637) solid;

  display: flex;
  flex-direction: column;

  margin-bottom: 10px;
}

.section-label {
    margin-bottom: 5px;
}

.input-items {
  max-height: inherit;
  min-height: inherit;

  display: flex;
  flex-direction: column;

  align-items: center;
}

.input-item {
  width: 300px;
  min-height: 25px;

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: space-around;
  margin: 5px 0;
}

.add-user {
  color: rgb(230, 172, 96);
  margin-bottom: 5px;
}

.type-section {
  width: 330px;
  min-height: 40px;

  color: white;

  display: flex;
  flex-direction: row;

  margin-bottom: 10px;
}

.split-type {
    margin-left: 10px;
}

</style>
