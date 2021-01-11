import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import axios, { AxiosResponse } from 'axios'

interface Star {
  id: number
  lastname: string
  firstname: string
  description: string
  image: string
}

@Module({
  namespaced: true
})
class Stars extends VuexModule {
  public stars: Array<{}> = []

  @Mutation
  public setStars(newStars: Array<{}>): void {
    this.stars = newStars
  }

  @Action
  public async fetchStars(): Promise<void> {
    await axios
      .get('http://localhost:8000/api/stars')
      .then(result => {
        this.context.commit('setStars', result.data)
      })
      .catch(error => {
        throw new Error(`API ${error}`)
      })
  }

  @Action
  public async createStar(star: Star): Promise<AxiosResponse> {
    return await axios
      .post('http://localhost:8000/api/stars', star)
      .catch(error => {
        throw new Error(`API ${error}`)
      })
  }

  @Action
  public async updateStar(star: Star): Promise<AxiosResponse> {
    return await axios
      .put(`http://localhost:8000/api/stars/${star.id}`, star)
      .catch(error => {
        throw new Error(`API ${error}`)
      })
  }

  @Action
  public async deleteStar(id: number): Promise<AxiosResponse> {
    return await axios
      .delete(`http://localhost:8000/api/stars/${id}`)
      .catch(error => {
        throw new Error(`API ${error}`)
      })
  }
}

export default Stars
