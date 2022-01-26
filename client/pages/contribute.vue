<template>
  <v-container fluid>
    <v-card>
      <v-row>
        <v-col cols="4">
          <v-subheader>Write something very mean</v-subheader>
        </v-col>
        <v-col cols="8">
          <v-textarea v-model="meanStatement" label="Arrrgh" prefix="😡" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-subheader>Write something nice</v-subheader>
        </v-col>
        <v-col cols="8">
          <v-textarea v-model="niceStatement" prefix="🙂" />
        </v-col>
      </v-row>
      <v-card-actions>
        <v-spacer />
        <v-btn
          :loading="loading"
          :disabled="loading"
          color="primary"
          @click="submitTrainingDataText"
        >
          Send
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- <v-btn
      color="grey"
      class="white--text"
      @click="window.open('https://github.com/unicef/kindly', '_blank')"
    >
      <v-icon>mdi-github</v-icon> Check out our Repository on Github
    </v-btn> -->

    <v-alert
      :value="loading"
      color="green"
      dark
      border="top"
      icon="mdi-home"
      transition="scale-transition"
      dismissible
    >
      Thank you for contributing to the Kindly Machine Learning training data
    </v-alert>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      meanStatement: '',
      niceStatement: '',
      loading: false,
    }
  },
  methods: {
    async submitTrainingDataText() {
      this.loading = !this.loading
      this.niceStatement = ''
      this.meanStatement = ''
    },
  },
}
</script>
