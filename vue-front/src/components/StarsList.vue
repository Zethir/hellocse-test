<template>
  <ul>
    <li
      v-for="(star, index) in stars"
      :key="star.id"
      @click="changeStar(index)"
    >
      {{ star.firstname + ' ' + star.lastname }}
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Prop, Emit } from 'vue-property-decorator'

export default class StarsList extends Vue {
  @Prop({ required: true, type: Object, default: {} })
  readonly stars!: object

  @Emit()
  changeStar(index: number) {
    return index
  }
}
</script>

<style scoped>
ul {
  background: #fefefe;
  display: grid;
  list-style-type: none;
  margin: 0;
  grid-template-rows: repeat(auto-fill, 3em);
  border-radius: 0.2em;
  width: 10em;
  padding: 1em 1em;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  justify-self: center;
}

ul li {
  display: flex;
  cursor: pointer;
  height: 3em;
  align-items: center;
  justify-content: center;
  border-radius: 0.5em;
}

ul li:hover {
  transition: all 0.5s ease-in;
  background: rgb(245, 245, 248);
}
</style>
