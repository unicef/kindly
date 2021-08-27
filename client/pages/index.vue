<template>
<div id="home">
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class=""> </v-card-title>
        <v-card-text>
          <p class="headline text-center text-md-center">KINDLY</p>
          <v-col cols="12">
            <v-text-field
              v-model="text"
              label="What do you want to say?"
              outlined
            ></v-text-field>
          </v-col>
        </v-card-text>
        <v-card-actions>
          <!-- width and height are optional 
          https://medium.com/@fonto.design/using-lottie-in-nuxt-js-554949d19063-->
          <lottie
            v-if="loading"
            :width="100"
            :height="100"
            :options="lottieOptions"
            v-on:animCreated="handleAnimation"
          />
          <v-spacer />
          <v-btn
            color="primary"
            :loading="loading"
            :disabled="loading"
            @click="obtainSentiment"
          >
            check
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</div>
  
</template>
<script>
import Lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "../assets/animation.json";

export default {
  components: {
    lottie: Lottie,
  },
  data() {
    return {
      text: "",
      loading: false,
      lottieOptions: { animationData: animationData.default },
      animationSpeed: 1,
      anim: null,
    };
  },
  methods: {
    async obtainSentiment() {
      this.loading = true;
    },
    handleAnimation(anim) {
      this.anim = anim;
    },

    stop() {
      this.anim.stop();
    },

    play() {
      this.anim.play();
    },

    pause() {
      this.anim.pause();
    },

    onSpeedChange() {
      this.anim.setSpeed(this.animationSpeed);
    },
  },
};
</script>
<style scoped>
/* #home {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  height: 100vh;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
} */
</style>
