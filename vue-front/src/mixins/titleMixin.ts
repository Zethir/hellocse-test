import { Options, Vue } from 'vue-class-component'

@Options({})
export default class TitleMixin extends Vue {
  /* eslint-disable */
  [x: string]: any

  created() {
    const title = this.title
    if (title) {
      document.title = title
    }
  }
}
