<template>
    <section class="score">
        Player <span>{{ playerScore }}</span> x <span>{{ computerScore }}</span> Computer
    </section>
</template>

<script>
export default {
    props: {
        lose: {
            type: Number,
            required: true
        },
        win: {
            type: Number,
            required: true
        }
    },
    computed: {
    playerScore() {
      // retorna o valor da prop "win" para o lado do jogador
      return this.win;
    },
    computerScore() {
      // retorna o valor da prop "lose" para o lado do computador
      return this.lose;
    }
  }
}
</script>

<style scoped lang="scss">
section.score {
    border-bottom: 1px solid black;
    padding: 24px;
    font-size: 18px;

    span {
        padding: 8px;
        font-weight: bold;
        border: 1px solid black;
    }
}
</style>