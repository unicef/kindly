<template>
  <div id="home">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class=""> </v-card-title>
          <v-card-text>
            <div class="text-h2 text-center text-md-center">KINDLY</div>
            <v-spacer />
            <v-col cols="12">
              <v-text-field
                v-model="text"
                label="What do you want to say?"
                outlined
              ></v-text-field>
            </v-col>
            <v-row>
              <v-col cols="12">
                <lottie
                  v-if="sentimentResult"
                  :width="100"
                  :height="100"
                  :options="lottieOptions"
                  v-on:animCreated="handleAnimation"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <p class="headline text-center text-md-center">
                  {{ sentimentMessage }}
                </p>
              </v-col>
            </v-row>
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
import * as loadingAnimation from "../assets/animation.json";
import * as positiveAnimation from "../assets/happy.json";
import * as negativeAnimation from "../assets/sad.json";
export default {
  components: {
    lottie: Lottie,
  },
  data() {
    return {
      text: "",
      loading: false,
      lottieOptions: { animationData: loadingAnimation.default },
      animationSpeed: 1,
      anim: null,
      sentimentResult: false,
      sentimentMessage: "",
    };
  },
  methods: {
    async obtainSentiment() {
      let vm = this;

      vm.initAnimation();

      if (vm.text) {
        this.loading = true;

        vm.sentimentResult = await this.$axios.post("/api/detect", {
          text: vm.text,
        });

        vm.loading = false;

        if (vm.sentimentResult) {
          let pos = vm.sentimentResult.data.result["not-offensive"];
          let neg = vm.sentimentResult.data.result["offensive"];
          if (
            parseFloat(vm.sentimentResult.data.result["offensive"]) >
            parseFloat(vm.sentimentResult.data.result["not-offensive"])
          ) {
            (vm.lottieOptions = { animationData: negativeAnimation.default }),
              (vm.sentimentMessage = "That's not a very nice thing to say 😾 ");
          } else {
            (vm.lottieOptions = { animationData: positiveAnimation.default }),
              (vm.sentimentMessage = "Great, you can post that!");
          }
        }
      }
      // Result sad face : https://assets10.lottiefiles.com/packages/lf20_pojzngga.json
      // Result happy face: https://assets7.lottiefiles.com/packages/lf20_sgzw5ogf.json
    },

    initAnimation() {
      let vm = this;
      vm.anim = null;
      (vm.lottieOptions = { animationData: loadingAnimation.default }),
        (vm.sentimentResult = false);
      vm.sentimentMessage = "";
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
