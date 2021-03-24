<template>
<div>
  <form novalidate class="md-layout" @submit.prevent="validateInput">
    <md-card class="md-layout-item">
      <md-card-header>
        <div class="md-title">From Inventory</div>
      </md-card-header>
      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-40">
            <md-datepicker v-model="form.selectedDate">
              <label>Select date</label>
              <span class="md-error" v-if="!$v.form.selectedDate.required">The date is required</span>
            </md-datepicker>
          </div>
        </div>
 
        <div class="md-layout md-gutter">    
          <div class="md-layout-item md-size-50" >
            <div>
              <label>Hour (From)</label>
            </div>
              <md-radio v-model="form.hourBegin" value=1>01</md-radio>
              <md-radio v-model="form.hourBegin" value=2>02</md-radio>
              <md-radio v-model="form.hourBegin" value=3>03</md-radio>
              <md-radio v-model="form.hourBegin" value=4>04</md-radio>
              <md-radio v-model="form.hourBegin" value=5>05</md-radio>
              <md-radio v-model="form.hourBegin" value=6>06</md-radio>
              <md-radio v-model="form.hourBegin" value=7>07</md-radio>
              <md-radio v-model="form.hourBegin" value=8>08</md-radio>
              <md-radio v-model="form.hourBegin" value=9>09</md-radio>
              <md-radio v-model="form.hourBegin" value=10>10</md-radio>
              <md-radio v-model="form.hourBegin" value=11>11</md-radio>
              <md-radio v-model="form.hourBegin" value=0>12</md-radio>
          </div>
          <div class="md-layout-item md-size-10">
            <div>
              <label>AM/PM (From)</label>
            </div>
            <md-radio v-model="form.ampmBegin" value=0>AM</md-radio>
            <md-radio v-model="form.ampmBegin" value=1>PM</md-radio>
          </div>
          <div class="md-layout-item md-size-15">
            <div>
              <label>Minutes (From)</label>
            </div>
            <md-radio v-model="form.minutesBegin" value=1>00</md-radio>
            <md-radio v-model="form.minutesBegin" value=2>15</md-radio>
            <md-radio v-model="form.minutesBegin" value=3>30</md-radio>
            <md-radio v-model="form.minutesBegin" value=4>45</md-radio>
          </div>
        </div>

        <md-divider></md-divider>

        <div class="md-layout md-gutter">    
          <div class="md-layout-item md-size-50" >
            <div>
              <label>Hour (To)</label>
            </div>
              <md-radio v-model="form.hourEnd" value=1>01</md-radio>
              <md-radio v-model="form.hourEnd" value=2>02</md-radio>
              <md-radio v-model="form.hourEnd" value=3>03</md-radio>
              <md-radio v-model="form.hourEnd" value=4>04</md-radio>
              <md-radio v-model="form.hourEnd" value=5>05</md-radio>
              <md-radio v-model="form.hourEnd" value=6>06</md-radio>
              <md-radio v-model="form.hourEnd" value=7>07</md-radio>
              <md-radio v-model="form.hourEnd" value=8>08</md-radio>
              <md-radio v-model="form.hourEnd" value=9>09</md-radio>
              <md-radio v-model="form.hourEnd" value=10>10</md-radio>
              <md-radio v-model="form.hourEnd" value=11>11</md-radio>
              <md-radio v-model="form.hourEnd" value=0>12</md-radio>
          </div>
          <div class="md-layout-item md-size-10">
            <div>
              <label>AM/PM (To)</label>
            </div>
            <md-radio v-model="form.ampmEnd" value=0>AM</md-radio>
            <md-radio v-model="form.ampmEnd" value=1>PM</md-radio>
          </div>
          <div class="md-layout-item md-size-15">
            <div>
              <label>Minutes (To)</label>
            </div>
            <md-radio v-model="form.minutesEnd" value=1>00</md-radio>
            <md-radio v-model="form.minutesEnd" value=2>15</md-radio>
            <md-radio v-model="form.minutesEnd" value=3>30</md-radio>
            <md-radio v-model="form.minutesEnd" value=4>45</md-radio>
          </div>
        </div>
        <md-divider></md-divider>

        <div class="md-layout-item md-size-40">
          <md-field>
            <label for="capacity">Capacity</label>
            <md-input type="number" id="capacity" v-model="form.capacity" :disabled="submit"></md-input>
            <span class="md-error" v-if="!$v.form.capacity.required">The capacity is required</span>
          </md-field>
        </div>

        <div class="md-layout md-gutter">  
          <md-card-actions>
            <md-button type="submit" class="md-primary" :disabled="submit">Submit</md-button>
          </md-card-actions>
        </div>

      </md-card-content>
    </md-card>


  </form>
</div>
</template>

<script>
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'
import format from 'date-fns/format'

export default {
  name: 'Reservations',
  mixins: [validationMixin],

  data() {
    const now = new Date();
    return {
        form: {
          selectedDate: format(now, 'yyyy-MM-dd'),
          hourBegin: null,
          minutesBegin: null,
          ampmBegin: null,
          hourEnd: null,
          minutesEnd: null,
          ampmEnd: null,
          capacity: null        
        },
        submit: false
    }
  },
  validations: {
    form: {
      selectedDate: {
        required
      },
      hourBegin: {
        required
      },
      ampmBegin: {
        required
      },
      minutesBegin: {
        required
      },
      hourEnd: {
        required
      },
      ampmEnd: {
        required
      },
      minutesEnd: {
        required
      },
      capacity: {
        required
      }
    }
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    validateInput() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.saveGuest();
      }
    },
    // 12:00 AM - 1, 12:15 AM - 2, 1:00 AM - 5
    // 12:00 PM - 49
    // Afternoon offset - 48
    calculateTimeCode(hour, minutes, ampm) {
      if ((hour !== null) && (minutes !== null) && (ampm!== null)) {
        return parseInt(hour) * 4 + parseInt(minutes) + ampm * 48;
      }
    },
    saveGuest() {
      const startTimeCode = this.calculateTimeCode(this.form.hourBegin, this.form.minutesBegin, this.form.ampmBegin);
      const endTimeCode = this.calculateTimeCode(this.form.hourEnd, this.form.minutesEnd, this.form.ampmEnd);

      if ((startTimeCode === -1 || endTimeCode === -1) && (startTimeCode > endTimeCode)) {
        // TODO Give some indication to User
        console.log("Should not happen");
        return;
      }
      try {
        const params = {
          date: this.form.selectedDate,
          timecodeBegin: startTimeCode,
          timecodeEnd: endTimeCode,
          capacity: Number(this.form.capacity)
        };
        axios.post('http://localhost:9090/create-inventory', params)
        .then((response) => {
          console.log(response);
        }, (error) => {
          console.log(error);
        });
      } catch (error) {
        console.log(error);
      }
    }
  },
}
</script>
