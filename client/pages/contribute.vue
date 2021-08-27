<template>
  <v-container fluid>
    <v-card>
    <v-row>
      <v-col cols="4">
        <v-subheader>Write something very mean</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-text-field
          label="Arrrgh"
          v-model = meanStatement
          prefix="😡"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-subheader>Write something nice</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-text-field
          v-model=niceStatement
          prefix="🙂"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-card-actions>
      <v-spacer />
          <v-btn
          :loading="loading"
          :disabled="loading"
            @click="submitTrainingDataText"
            color="primary"
          >
            Send
          </v-btn>
    </v-card-actions>
</v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return{
      meanStatement:'',
      niceStatement:'',
      loading: false
    }
  },
  methods:{
    async submitTrainingDataText(){
      
    }
  }
}
</script>