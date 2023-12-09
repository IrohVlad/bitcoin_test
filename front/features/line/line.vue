<template>
        <div class="line-container">
            <vline id="my-line" :options="{responsive: true, aspectRatio: '1.4', plugins: {legend: false}, scales: {x: {ticks: {autoSkip: true, maxRotation: 0, font: {family: 'Roboto'}}}}}" :data="{labels, datasets: [ { label:'Bitcoin', backgroundColor: '#3bbc00', borderWidth: '1', pointStyle: false, borderColor: '#3bbc00', data}]}"/>
        </div>
</template>

<script>
import {Line} from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
    ChartJS.register(CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend)
    export default {
        components: {
            vline :Line
        },
        props: ['labels', 'data']
    }
</script>

<style lang="scss">
@import url("styles.scss");
</style>