<template>
  <div class="main-content">
    <div class="content">
      <h3>Dropil Chain Staking Calculator</h3>

      <div class="paragraphs active">
        <p>
          Fields are auto-filled with the current state of Dropil Chain. You may edit any field except the total supply field.
        </p>

        <p class="danger">
          <b>Auto-filled values are currently based on the testnet of Dropil Chain. Actual values when mainnet is launched will vary.</b>
        </p>
      </div>      

      <div class="section home">        
        <div class="form">
          <div class="input-wrap">
            <label>Current Total Supply</label>
            <input type="text" v-model="supply" readonly="readonly" />
          </div>

          <div class="input-wrap">
            <label v-tooltip="'The inflation rate ranges between 10-20% depending on the total staked Drops. The percent rises if the total staked is less than two-thirds the total supply and falls if greater than two-thirds.'">Inflation Rate (%) <i class="fas fa-info-circle"></i></label>
            <input type="text" v-model="inflation" />
          </div>

          <div class="input-wrap">
            <label v-tooltip="'The total amount of Drops staked between all delegators'">Total Staked <i class="fas fa-info-circle"></i></label>
            <input type="text" v-model="totalStake" />
          </div>

          <div class="input-wrap">
            <label v-tooltip="'The amount of Drops you are delegating'">Your Stake <i class="fas fa-info-circle"></i></label>
            <input type="text" v-model="stake" placeholder="Enter your stake" />
          </div>

          <div class="input-wrap">
            <label>Duration of Stake (Months)</label>
            <input type="text" v-model="duration" />
            <small>= {{days}} days</small>
          </div>          
        </div>  

        <div class="results">
          <h2>Result</h2>

          <div class="result">
            <div class="left">
              Total Drop Inflation:
            </div>

            <div class="right">
              {{pretty(inflatedAmount)}} Drops
            </div>
          </div>

          <div class="result">
            <div class="left">
              New Total Supply:
            </div>

            <div class="right">
              {{pretty(newSupply)}} Drops
            </div>
          </div>

          <div class="result">
            <div class="left">
              My Earnings:
            </div>

            <div class="right">
              {{pretty(myEarnings)}} Drops ({{pretty(myEarningsPercent)}}%)
            </div>
          </div>
        </div>      
      </div>
    </div>
  </div>
</template>

<script>
import tools from '../mixins/tools'

export default {
  name: "Home",
  data() {
    return {
      supply: "Loading...",
      inflation: "Loading...",
      totalStake: "Loading...",
      stake: "",
      duration: "12"
    };
  },
  mounted() {
    tools.fetch('https://testnet-api.dropilchain.com/supply/total/udrop').then(data => {
      this.supply = (parseFloat(data.result) / 1000000.0)
    })

    tools.fetch('https://testnet-api.dropilchain.com/minting/inflation').then(data => {
      this.inflation = (parseFloat(data.result) * 100).toLocaleString('en-US', { maximumFractionDigits: 2 })
    })

    tools.fetch('https://testnet-api.dropilchain.com/staking/pool').then(data => {
      this.totalStake = (parseFloat(data.result.bonded_tokens) / 1000000.0)
    })
  },
  computed: {
    days() {
      return Math.round((this.duration || 0) * 30.4167);
    },
    n() {
      return (365 * 24 * 60 * 60) / 5;
    },
    inflatedAmount() {
      return (
        this.remove(this.supply) *
          Math.pow(
            1 + this.inflation / 100.0 / this.n,
            (this.n * parseFloat(this.duration || 0)) / 12.0
          ) -
        this.remove(this.supply)
      );
    },
    newSupply() {
      return parseFloat(this.remove(this.supply)) + this.inflatedAmount;
    },
    stakePercent() {
      return (
        parseFloat(this.remove(this.stake)) /
        parseFloat(this.remove(this.totalStake))
      );
    },
    myEarnings() {
      return this.inflatedAmount * this.stakePercent || 0;
    },
    myEarningsPercent() {
      return (this.myEarnings / this.remove(this.stake)) * 100 || 0;
    }
  },
  methods: {
    remove(val) {
      return val.toString().replace(/,/g, "");
    },
    pretty(val) {
      if (val === 'Loading...') return val
      let period = val.toString().slice(-1) === '.' ? '.' : ''

      let pretty = parseFloat(
        val.toString().replace(/,/g, "")
      ).toLocaleString("en-US", { maximumFractionDigits: 2 })

      return pretty === 'NaN' ? '' : pretty + period
    }
  },
  watch: {
    supply() {
      this.supply = this.pretty(this.supply);
    },
    totalStake() {
      this.totalStake = this.pretty(this.totalStake);
    },
    stake() {
      this.stake = this.pretty(this.stake);
    }
  }
};
</script>
