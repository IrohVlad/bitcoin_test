<template>
    <div class="_wrapper _dark">
        <vueheader/>
        <main>
        <chart/>
        </main>
    </div>
</template>

<script>
import header from '~/widgets/header/header.vue'
import chart from '~/widgets/chart/chart.vue'
    export default {
        components: {
            vueheader: header,
            chart
        },
        props: {

        },
        setup(props){

        }
    }
</script>

<style lang="scss">
@import url("styles.scss");
</style>
    