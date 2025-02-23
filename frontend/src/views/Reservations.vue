<template>
<div>
  <form novalidate class="md-layout" @submit.prevent="validateInput">
    <md-card class="md-layout-item">
      <md-card-header>
        <div class="md-title">Guest Reservation</div>
      </md-card-header>
      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-40">
            <md-field :class="getValidationClass('name')">
              <label for="name">Name</label>
              <md-input type="text" id="name" v-model="form.name" :disabled="submit"></md-input>
              <span class="md-error" v-if="!$v.form.name.required">The name is required</span>
            </md-field>
          </div>
          <div class="md-layout-item md-size-40">
            <md-field>
              <label for="email">Email</label>
              <md-input type="email" id="email" v-model="form.email" :disabled="submit"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-20">
              <md-field :class="getValidationClass('partySize')">
                <label for="partySize">Party Size</label>
                <md-select name="partySize" id="partySize" v-model="form.partySize" :disabled="submit">
                  <md-option v-for="count in guestCounts" :key="count" :value="count">
                    {{ count }}
                  </md-option>
                </md-select>
                <span class="md-error" v-if="!$v.form.partySize.required">The PartySize is required</span>
              </md-field>
          </div>
        </div>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-30">
            <md-datepicker v-model="form.selectedDate" :class="getValidationClass('selectedDate')">
              <label>Select date</label>
              <span class="md-error" v-if="!$v.form.selectedDate.required">The date is required</span>
            </md-datepicker>
          </div>
        </div>
 
        <div class="md-layout md-gutter">    
          <div class="md-layout-item md-size-50" >
            <div>
              <label>Hour</label>
            </div>
              <md-radio v-model="form.hour" value=1>01</md-radio>
              <md-radio v-model="form.hour" value=2>02</md-radio>
              <md-radio v-model="form.hour" value=3>03</md-radio>
              <md-radio v-model="form.hour" value=4>04</md-radio>
              <md-radio v-model="form.hour" value=5>05</md-radio>
              <md-radio v-model="form.hour" value=6>06</md-radio>
              <md-radio v-model="form.hour" value=7>07</md-radio>
              <md-radio v-model="form.hour" value=8>08</md-radio>
              <md-radio v-model="form.hour" value=9>09</md-radio>
              <md-radio v-model="form.hour" value=10>10</md-radio>
              <md-radio v-model="form.hour" value=11>11</md-radio>
              <md-radio v-model="form.hour" value=0>12</md-radio>
            <!-- <div :class="getValidationClass('hour')">
              <span class="md-error" v-if="!$v.form.hour.required">The hour field is required</span>
            </div> -->
          </div>
          <div class="md-layout-item md-size-10">
            <div>
              <label>AM/PM</label>
            </div>
            <md-radio v-model="form.ampm" value=0>AM</md-radio>
            <md-radio v-model="form.ampm" value=1>PM</md-radio>
          </div>
          <div class="md-layout-item md-size-15">
            <div>
              <label>Minutes</label>
            </div>
            <md-radio v-model="form.minutes" value=1 :disabled=checkAvailability(1)>00</md-radio>
            <md-radio v-model="form.minutes" value=2 :disabled=checkAvailability(2)>15</md-radio>
            <md-radio v-model="form.minutes" value=3 :disabled=checkAvailability(3)>30</md-radio>
            <md-radio v-model="form.minutes" value=4 :disabled=checkAvailability(4)>45</md-radio>
          </div>
        </div>

        <md-divider></md-divider>

        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-50">
            <md-card-actions>
              <md-button type="submit" class="md-raised  md-primary" :disabled="submit">Submit</md-button>
            </md-card-actions>
          </div>
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
          name: null,
          email: null,
          partySize: null,
          selectedDate: format(now, 'yyyy-MM-dd'),
          hour: null,
          minutes: null,
          ampm: null,
          time: null
        },
        submit: false,
        guestCountSelected: 1,
        availabilityMap: new Map(),
        guestCounts: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    }
  },
  validations: {
    form: {
      name: {
        required
      },
      selectedDate: {
        required
      },
      partySize: {
        required
      },
      hour: {
        required
      },
      ampm: {
        required
      },
      minutes: {
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

    checkAvailability(min) {
      if (this.form.hour && this.form.ampm) { 
        const code = this.calculateTimeCode(this.form.hour, min, this.form.ampm);
        const available = this.availabilityMap.get(code);
        if (available > 0)
          return false;
        else 
          return true;
      } else {
        return true;
      }
    },

    saveGuest() {
      const code = this.calculateTimeCode(this.form.hour, this.form.minutes, this.form.ampm);
      if (code === -1) {
        // TODO Give some indication to User
        console.log("Should not happen.");
        return;
      }
      try {
        const params = {
          name: this.form.name,
          email: this.form.email,
          size: this.form.partySize,
          date: this.form.selectedDate,
          timecode: code
        };
        axios.post('http://localhost:9090/reservation/add', params)
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

  // TODO: May be call everytime we change the hour or min?
  updateMap() {
    try {
      const params = {
        date: this.form.selectedDate
      };
      axios.post('http://localhost:9090/inventory/querybyDate', params)
      .then((response) => {
        this.availability = response;
        if (response && response.data.all) {
          response.data.all.forEach((availObj) => {
            this.availabilityMap.set(availObj.timecode, availObj.available);
          });
        }
      }, (error) => {
        console.log(error);
      })
    } catch (error) {
      console.error(error)
    }
  },

  // Currently getting the count everytime we land the page.
  async mounted() {
    try {
      const params = {
        date: this.form.selectedDate
      };
      axios.post('http://localhost:9090/inventory/querybyDate', params)
      .then((response) => {
        this.availability = response;
        if (response && response.data.all) {
          response.data.all.forEach((availObj) => {
            this.availabilityMap.set(availObj.timecode, availObj.available);
          });
        }
      }, (error) => {
        console.log(error);
      })
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
