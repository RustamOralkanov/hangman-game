import { getRandomName } from '@/api/getRandomNames'
import { onMounted, ref } from 'vue'

export const useRandomWord = () => {
  const word = ref('')

  const getRandomWord = async () => {
    try {
      const name = await getRandomName()
      word.value = name.toLocaleLowerCase()
    } catch (error) {
      alert('Ooops! Something Went Wrong')
      word.value = ''
    }
  }

  onMounted(() => {
    getRandomWord()
  })

  return {
    word,
    getRandomWord
  }
}
