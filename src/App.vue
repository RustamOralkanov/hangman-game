<script setup lang="ts">
import GameHeader from './components/GameHeader.vue'
import GameFigure from './components/GameFigure.vue'
import GameWrongLetters from './components/GameWrongLetters.vue'
import GameWord from './components/GameWord.vue'
import GamePopUp from './components/GamePopUp.vue'
import GameNotification from './components/GameNotification.vue'
import { ref, watch } from 'vue'
import { useRandomWord } from './composables/useRandomWord'
import { useLetters } from './composables/useLetters'
import { useNotification } from './composables/useNotification'

const { word, getRandomWord } = useRandomWord()
const { letters, correctLetters, wrongLetters, isWin, isStatusLose, addLetter, resetLetters } =
  useLetters(word)
const { notification, showNotification } = useNotification()

const popUp = ref<InstanceType<typeof GamePopUp> | null>(null)

const restart = async () => {
  await getRandomWord()
  resetLetters()
  popUp.value?.close()
}

watch(wrongLetters, () => {
  if (isStatusLose.value) {
    popUp.value?.open('lose')
  }
})

watch(correctLetters, () => {
  if (isWin.value) {
    popUp.value?.open('win')
  }
})

window.addEventListener('keydown', ({ key }) => {
  if (isStatusLose.value || isWin.value) {
    return
  }

  addLetter(key)

  if (letters.value.includes(key)) {
    showNotification()
    return
  }
})
</script>

<template>
  <span style="color: #fff">{{ word }}</span>
  <GameHeader />
  <div class="game-container">
    <GameFigure :wrongLettersCount="wrongLetters.length" />
    <GameWrongLetters :wrongLetters="wrongLetters" />
    <GameWord :word="word" :correctLetters="correctLetters" />
  </div>

  <GamePopUp ref="popUp" :word="word" @restart="restart" />
  <GameNotification ref="notification" />
</template>

<style scoped></style>
