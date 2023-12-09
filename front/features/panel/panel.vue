<template>
    <div class="panel">
        <div class="current">
        {{ current }} USD
        </div>
        <div class="difference">{{ diff }}%</div>
        <div class="panel_buttons">
            <div @click="dateInput( 'yesterday', new Date().toISOString().slice(0, 10))" class="panel_button">
                Day
            </div>
            <div @click="dateInput( 'week ago', new Date().toISOString().slice(0, 10))" class="panel_button">
                Week
            </div>
            <div @click="dateInput( 'month ago', new Date().toISOString().slice(0, 10))" class="panel_button">
                Month
            </div>
            <div @click="dateInput( 'year ago', new Date().toISOString().slice(0, 10))" class="panel_button">
                Year
            </div>
        </div>
        <div class="dates">
            <div class="input">
                <input :value="start"  @change="dateInput($event.target.value, end)" type="date">
            </div>
            <div class="input">
                <input :value="end"  @change="dateInput(start, $event.target.value)" type="date">
            </div>
        </div>
        <div @click="pushData" :class="start && end ? 'confirm confirm_active' : 'confirm'">
            Get Data
        </div>
    </div>
</template>

<script>

export default{
    emits: ['defineOption'],
    props: ['current', 'diff'],
    setup(props, context){
        console.log(new Date().toISOString().slice(0, 10))
        const start = ref('');
        const end = ref('');
        function dateInput(st, en){
            const today = new Date()
            if(st == 'yesterday'){
                const yesterday = new Date(today)
                yesterday.setDate(yesterday.getDate() - 1)
                st = yesterday.toISOString().slice(0, 10)
            } else if (st == 'week ago'){
                const week = new Date(today)
                week.setDate(week.getDate() - 7)
                st = week.toISOString().slice(0, 10)
            } else if(st == 'month ago'){
                const month = new Date(today)
                month.setDate(month.getDate() - 30)
                st = month.toISOString().slice(0, 10)
            } else if(st == 'year ago') {
                const year = new Date(today)
                year.setDate(year.getDate() - 365)
                st = year.toISOString().slice(0, 10)
            }

            start.value = st
            end.value = en
            console.log(start.value, end.value)
            // context.emit('defineOption', start.value)
        }
        function pushData(){
            context.emit('defineOption', start.value, end.value)
            start.value = ''
            end.value = ''
        }
        return{dateInput, pushData, start, end}
    }
}
</script>

<style lang="scss">
@import url("styles.scss");
</style>