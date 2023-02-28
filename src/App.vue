<template>
  <div class="app">
    <ScoreBoardVue :lose="this.loseCount" :win="this.winCount"/>
    <template v-if="this.question">
      <h1 v-html="this.question"></h1>
      <template v-for="(answer, index) in this.answers" :key="index">
        <input :disabled="this.answerSubmitted" type="radio" name="options" :value="answer" v-model="this.chosenAnswer">
        <label v-html="answer"></label><br>
      </template>

      <button v-if="!answerSubmitted" class="send" type="button" @click="sendAnswer">Send</button>

      <section v-if="answerSubmitted" class="results">
        <h4 v-if="this.incorrectAnswers.includes(this.chosenAnswer)">&#10060; Too bad, wrong answer. The correct is <span
            v-html="correctAnswers"></span></h4>

        <h4 v-else>
          &#9989; Congratulations, correct answer. <span v-html="correctAnswers"></span> is correct!
        </h4>
        <button @click="this.getNewQuestion()" class="send" type="button">Next question</button>
      </section>
    </template>
  </div>
</template>

<script>
import ScoreBoardVue from './components/ScoreBoard.vue'
import http from './services/api'

export default {

  components: {
    ScoreBoardVue
  },
  data() {
    return {
      question: undefined,
      incorrectAnswers: undefined,
      correctAnswers: undefined,
      chosenAnswer: undefined,
      answerSubmitted: false,
      winCount: 0,
      loseCount: 0
    }
  },
  methods: {
    sendAnswer() {
      if (!this.chosenAnswer) {
        alert('Choose one of the options')
      }
      else {
        this.answerSubmitted = true;
        if (this.chosenAnswer == this.correctAnswers) {
          this.winCount++;
        } else{
          this.loseCount++
        }
      }
    },

    getNewQuestion() {
      this.answerSubmitted = false;
      this.chosenAnswer = undefined
      this.question = undefined

      http.get("https://opentdb.com/api.php?amount=1").then((response) => {
        this.question = response.data.results[0].question;
        this.incorrectAnswers = response.data.results[0].incorrect_answers;
        this.correctAnswers = response.data.results[0].correct_answer;

      })
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
    this.getNewQuestion();
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
