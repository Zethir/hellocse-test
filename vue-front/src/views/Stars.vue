<template>
  <div class="star-grid">
    <stars-list :stars="stars" @change-star="changeStar" />
    <div v-if="Object.keys(selectedStar).length" class="star-page">
      <div class="title-wrap">
        <h2>{{ selectedStar.firstname + ' ' + selectedStar.lastname }}</h2>
        <img :src="selectedStar.image" />
      </div>
      <p>{{ selectedStar.description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import StarsList from '@/components/StarsList.vue'

const starsModule = namespace('Stars')

@Options({
  components: {
    StarsList
  }
})
export default class Stars extends Vue {
  private selectedStar: object = {}

  @starsModule.State
  private stars!: Array<{}>

  @starsModule.Action
  private fetchStars!: () => void

  created() {
    this.fetchStars()
  }

  @Watch('stars')
  starsUpdated(stars: Array<{}>) {
    this.selectedStar = Object.assign({}, stars[0])
  }

  public changeStar(index: number) {
    this.selectedStar = Object.assign({}, this.stars[index])
  }
}
</script>
<style scoped>
.star-grid {
  display: grid;
  align-items: start;
  margin: 0.5em 0.5em;
  grid-template-rows: auto auto;
  row-gap: 2em;
}

.title-wrap {
  display: grid;
  grid-template-rows: auto auto;
  gap: 1em;
}

.star-page {
  display: grid;
  background: #fefefe;
  grid-template-rows: auto auto;
  align-items: start;
  gap: 2em;
  padding: 1em 2em;
  border-radius: 0.2em;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
}

.star-page p {
  white-space: pre-line;
  text-align: justify;
  text-justify: inter-word;
  margin: 0;
}

.title-wrap img {
  border-radius: 0.2em;
  width: 30vw;
  justify-self: center;
}

.title-wrap h2 {
  margin: 0;
  align-self: end;
}

@media (min-width: 640px) {
  .title-wrap img {
    width: 20vw;
  }

  .star-page {
    padding: 2em 3em;
  }
}

@media (min-width: 768px) {
  .star-grid {
    margin: 2em 2em;
    grid-template-columns: 30vw 60vw;
  }

  .star-page {
    grid-template-columns: auto auto;
  }

  .title-wrap img {
    width: 19vw;
  }
}

@media (min-width: 1024px) {
  .title-wrap img {
    width: 18vw;
  }
}

@media (min-width: 1280px) {
  .title-wrap img {
    width: 16vw;
  }
}
</style>
