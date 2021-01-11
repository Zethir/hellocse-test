<template>
  <div class="form-grid">
    <div class="form-select-grid">
      <stars-list :stars="stars" @change-star="changeStar" />
      <div class="add-button">
        <img @click="setNewForm" src="@/assets/add-button.svg" />
      </div>
    </div>
    <form @submit="validateForm" class="star-form">
      <div v-if="success" class="success">{{ success }}</div>
      <div v-if="errors.length" class="error-wrapper">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="(error, index) in errors" :key="'error-' + index">
            {{ error }}
          </li>
        </ul>
      </div>
      <div class="form-children">
        <label for="firstname">Firstname</label>
        <input
          type="text"
          v-model="selectedStar.firstname"
          id="firstname"
          placeholder="Firstname"
        />
      </div>
      <div class="form-children">
        <label for="lastname">Lastname</label>
        <input
          type="text"
          v-model="selectedStar.lastname"
          id="lastname"
          placeholder="Lastname"
        />
      </div>
      <div class="form-children">
        <label for="description">Description</label>
        <textarea
          v-model="selectedStar.description"
          id="description"
          placeholder="Description"
        ></textarea>
      </div>
      <div class="form-children">
        <label for="image">Image</label>
        <input
          type="text"
          v-model="selectedStar.image"
          id="image"
          placeholder="Image URL"
        />
      </div>
      <input
        v-if="selectedStar.id"
        class="delete-button"
        type="button"
        value="Delete Star"
        @click.prevent="removeStar"
      />

      <input class="submit-button" type="submit" value="Submit" />
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import StarsList from '@/components/StarsList.vue'
import { AxiosResponse } from 'axios'

const starsModule = namespace('Stars')

interface Star {
  id: number
  lastname: string
  firstname: string
  description: string
  image: string
}

@Options({
  components: {
    StarsList
  }
})
export default class BackOffice extends Vue {
  private selectedStar: Star = {
    id: 0,
    lastname: '',
    firstname: '',
    description: '',
    image: ''
  }

  private errors: Array<string> = []
  private success = ''

  @starsModule.State
  private stars!: Array<{}>

  @starsModule.Action
  private fetchStars!: () => void

  @starsModule.Action
  private updateStar!: (star: Star) => Promise<AxiosResponse>

  @starsModule.Action
  private createStar!: (star: Star) => Promise<AxiosResponse>

  @starsModule.Action
  private deleteStar!: (id: number) => Promise<AxiosResponse>

  created() {
    this.fetchStars()
  }

  @Watch('stars')
  starsUpdated(stars: Array<{}>) {
    this.selectedStar = Object.assign({} as Star, stars[0])
  }

  public changeStar(index: number) {
    this.errors = []
    this.success = ''
    this.selectedStar = Object.assign({} as Star, this.stars[index])
  }

  public removeStar() {
    this.deleteStar(this.selectedStar.id).then((res: AxiosResponse) => {
      if (res.status === 200) {
        this.success = 'Star successfully deleted'
        this.fetchStars()
      } else {
        this.errors.push(res.statusText)
      }
    })
  }

  public setNewForm() {
    this.errors = []
    this.success = ''
    this.selectedStar.lastname = ''
    this.selectedStar.firstname = ''
    this.selectedStar.description = ''
    this.selectedStar.image = ''
    this.selectedStar.id = 0
  }

  public validateForm(e: Event) {
    this.errors = []
    this.success = ''

    if (!this.selectedStar.lastname || this.selectedStar.lastname.length > 40) {
      this.errors.push('Lastname is required (max: 40 characters)')
    }

    if (
      this.selectedStar.firstname === '' ||
      this.selectedStar.firstname.length > 40
    ) {
      this.errors.push('Firstname is required (max: 40 characters)')
    }

    if (!this.selectedStar.description) {
      this.errors.push('Description is required')
    }

    if (!this.selectedStar.image || this.selectedStar.image.length > 200) {
      this.errors.push('Image is required (max: 200 characters)')
    }

    if (!this.errors.length && this.selectedStar.id !== 0) {
      this.updateStar(this.selectedStar).then((res: AxiosResponse) => {
        if (res.status === 200) {
          this.success = 'Star successfully updated'
          this.fetchStars()
        } else {
          this.errors.push(res.statusText)
        }
      })
    } else if (!this.errors.length) {
      this.createStar(this.selectedStar).then((res: AxiosResponse) => {
        if (res.status === 200) {
          this.success = 'Star successfully created'
          this.fetchStars()
        } else {
          this.errors.push(res.statusText)
        }
      })
    }

    e.preventDefault()
  }
}
</script>

<style scoped>
.form-grid {
  display: grid;
  align-items: start;
  margin: 0.5em 0.5em;
  grid-template-rows: auto auto;
  row-gap: 2em;
  justify-content: center;
}

.form-select-grid {
  display: grid;
  grid-template-rows: auto auto;
  row-gap: 2em;
}

.add-button {
  justify-self: center;
  width: 10em;
  background: #fefefe;
  padding: 1em 1em;
  border-radius: 0.2em;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
}

.add-button img {
  width: 4em;
  cursor: pointer;
  transition: filter 0.4s ease-in-out;
}

.add-button img:hover {
  filter: brightness(75%);
}

.star-form {
  display: grid;
  grid-template-rows: repeat(6, auto);
  align-items: center;
  row-gap: 1.5em;
  justify-content: center;
  padding: 1em 2em;
  border-radius: 0.2em;
  background: #fefefe;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  width: 50vw;
}

.error-wrapper {
  justify-self: center;
}

.error-wrapper ul {
  font-size: 12px;
  margin-bottom: 0;
  padding: 1.5em 0;
  border: 1px solid rgba(231, 13, 13, 0.507);
  border-radius: 0.5em;
  background-color: rgba(231, 13, 13, 0.507);
}

.error-wrapper ul li {
  color: rgb(231, 13, 13);
}

.success {
  font-size: 12px;
  background-color: rgb(37, 192, 37);
  padding: 1.5em 0;
  border: 0.1em solid rgb(8, 231, 8);
  border-radius: 0.5em;
  color: rgb(11, 92, 11);
}

.form-children {
  display: grid;
  grid-template-rows: auto auto;
  row-gap: 0.5em;
  justify-items: center;
}

.form-children input,
textarea {
  outline: none;
  padding: 1em 2em;
  border: 1em transparent;
  border-radius: 1.5em;
  background: rgb(219, 219, 226);
}

textarea {
  resize: none;
  overflow: auto;
  height: 26vh;
  width: 30vw;
}

.submit-button,
.delete-button {
  cursor: pointer;
  margin-top: 1em;
  border: 1em transparent;
  border-radius: 2em;
  padding: 0.7em 0.5em;
  font-size: 14px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  transition: background 0.4s ease-in-out;
}

.submit-button {
  background: rgb(234, 234, 238);
}

.delete-button {
  background: rgb(212, 43, 13);
  color: white;
}

.submit-button:hover {
  background: rgb(219, 219, 226);
}

.delete-button:hover {
  background: rgb(158, 32, 10);
}

@media (min-width: 768px) {
  .form-grid {
    margin: 1em 1em;
    grid-template-columns: 30vw 40vw;
  }

  .star-form {
    width: auto;
  }
}
</style>
