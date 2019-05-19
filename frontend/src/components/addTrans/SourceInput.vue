<template>
  <div :class="$style['source-input']">
    <div :class="$style['user-input']">
      <select v-model="sources[index].user" :class="$style['user-select']">
        <option
          v-for="(user, selectIndex) in users"
          :class="$style['user-option']"
          :key="selectIndex"
          :value="user"
        >
          {{ user }}
        </option>
      </select>
    </div>

    <div :class="$style['value-input']">
      <input
        v-model="sources[index].value"
        type="number"
        step="0.001"
        :class="$style['text-input']"
      />
    </div>

    <div :class="[$style['remove-source'], 'noselect']">
      <i @click="$emit('remove', index)"> delete </i>
    </div>
  </div>
</template>


<script>
export default {
  name: 'SourceUnit',

  props: ['users', 'sources', 'index'],
}
</script>


<style module>
.source-input {
  width: 320px;
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

  /* min-width: 100px; */
  max-width: inherit;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;

  font-weight: 200;
  font-size: 16px;
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
  border-bottom: 1px gray solid;

  color: lightgray;

  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;

  font-size: 14px;
  margin-top: 3px;

  width:140px;
   overflow:hidden;

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

.source-input > .value-input {
  max-width: 120px  ;
}
</style>
