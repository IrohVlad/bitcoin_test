<template>
    <section class="chart-section">
        <div class="chart _container">
            <vline :labels="data?.labels" :data="data?.data" />
            <panel :current="data?.current" :diff="data?.diff" @defineOption="setOption"/>
        </div>

    </section>
</template>

<script>
import line from '~/features/line/line.vue'
import panel from '~/features/panel/panel.vue'
export default {
    components: {
        vline: line,
        panel
    },
    async setup(){
        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        const option = ref({start: yesterday.toISOString().slice(0, 10), end: today.toISOString().slice(0, 10)})
        const {data, refresh} = await useAsyncData('data',()=> {
            return $fetch(`http://localhost:7000/history?start=` + option.value.start + `&end=` + option.value.end)
        })
        if(data.value){
            console.log(data.value)
        }
        const setOption = (start, end) =>{
            option.value.start = start;
            option.value.end = end;
            refresh()
            if(data.value){
                console.log(data.value)
            }
        }
        
        return {data, option, setOption}
    }
}
</script>

<style lang="scss">
@import url("styles.scss");
</style>