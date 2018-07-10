<template>
<div :class="$style['target-input']">
  <div :class="$style['user-select']">
    <select v-model="targets[index].user" :class="$style['user-select']">
        <option
        :class="$style['user-option']"
        v-for="(user, selectIndex) in users" 
        :value="user"
        :key="selectIndex">
            {{ user }}
        </option>
    </select>
  </div>
  <div :class="$style['value-input']">
      <input 
        v-model="targets[index][curProperty]" 
        type="number" 
        :readonly="splitType === 'equally'"
        :class="$style['text-input']"
      />
  </div>
  <div :class="[$style['remove-target'], 'noselect']">
    <i @click="$emit('remove', index)"> delete </i>
  </div>
</div>
</template>


<script>
const { R } = window

export default {
  name: 'SourceUnit',
  props: ['users', 'targets', 'index', 'curProperty', 'splitType']
}
</script>


<style module>
.target-input {
  width: 300px;
  min-height: 35px;

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: space-around;
  margin: 5px 0;
  box-shadow: 0px 2px 2px rgba(39, 39, 39, 0.377);
}

.text-input {
  background: none;
  border: none;
  border-bottom: 1px gray solid;

  color: lightgray;

  min-width: 200px;

  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;

  font-weight: 200;
  font-size: 14px;
  letter-spacing: .9px;

  text-align: justify;
  padding-left: 5px;
}

.text-input:focus {
  outline: none;
  border-bottom: 1px rgb(255, 233, 136) solid;
}

.user-select {
  background: none;
  border: none;
  border-bottom: .5px gray solid;

  color: lightgray;

  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;

  font-size: 14px;
  margin-top: 1px
}

.user-select:focus {
  outline: none;
}

.user-option {
  background: rgb(78, 78, 78);
  color: lightgray;
}

.user-option:checked {
  background: rgb(255, 233, 136);
  color: rgb(78, 78, 78);
}

</style>
