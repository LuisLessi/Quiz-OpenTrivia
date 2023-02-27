<template>
  <div class="app">
    <h1 v-html="this.question"></h1>

    <template v-for="(answer, index) in this.answers" :key="index">
      <input type="radio" name="options" :value="answers">
      <label v-html="answer"></label><br>
    </template>

    <button class="send" type="button">Send</button>
  </div>
</template>

<script>
import http from './services/api'

export default {
  data() {
    return {
      question: '',
      incorrectAnswers: [],
      correctAnswers: [],
    }
  },

  computed: {
    answers() {
      var answers = JSON.parse(JSON.stringify(this.incorrectAnswers));
      answers.splice(Math.round(Math.random() * answers.length), 0, this.correctAnswers)
      return answers;
    }
  },

  created() {
    http.get("https://opentdb.com/api.php?amount=1").then((response) => {
      this.question = response.data.results[0].question;
      this.incorrectAnswers = response.data.results[0].incorrect_answers;
      this.correctAnswers = response.data.results[0].correct_answer;

    })
  }
}
</script>

<style scoped lang="scss">
.app {
  font-family: Avenir, Arial, Helvetica, sans-serif;
  --webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  max-width: 960px;

  input[type=radio] {
    margin: 12px 4px;
  }

  button.send {
    margin-top: 12px;
    height: 40px;
    min-width: 120px;
    padding: 0 16px;
    color: #fff;
    background-color: #1867c0;
    border: 1px solid #1867c0;
    cursor: pointer;
  }
}
</style>
