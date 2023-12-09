import express from 'express'
import cors from 'cors'
import sequelize from './models/db.js';
import { History} from './models/model.js'
import {Op} from 'sequelize'

const app = express();

app.use(cors());
app.use(express.json());
app.get('/history', async (req, res)=>{
    const {start, end} = req.query;
    let diff
    let current
    let data
    let labels
    let Data
    try{
        Data = await History.findAll({order: [['date', 'ASC']], where: {
            date: {[Op.between]: [ start, end]}
        }})
        if(!Data.length){
            const response = await fetch(`https://api.twelvedata.com/time_series?apikey=fe867bf59e374825801d23781fbd7e2e&interval=30min&end_date=${end}&start_date=${start}&symbol=BTC/USD&type=index&timezone=utc&format=JSON%22`).then((data) => data.json())
            response.values.forEach(async (value)=>{
                Data = await History.create({date: value.datetime, close: value.close})
            })
        }
        // let full = true
        // Data.forEach((value, index)=>{
        //     if(index){
        //         let diff = Data[index].date - Data[index - 1].date;
        //         if(diff != 1800000){
        //             full = false
        //         }
        //     }
        // })
        // if(!full){
            const response = await fetch(`https://api.twelvedata.com/time_series?apikey=fe867bf59e374825801d23781fbd7e2e&interval=30min&end_date=${end}&start_date=${start}&symbol=BTC/USD&type=index&timezone=utc&format=JSON%22`).then((data) => data.json())
            response.values.forEach(async (value)=>{
                let result = await History.findOne({where: {
                    date: value.datetime
                }})
                if(!result){
                    console.log(value.datetime.toString())
                    await History.create({date: value.datetime, close: value.close})
                }
            })
        // }
        Data = await History.findAll({order: [['date', 'ASC']], where: {
            date: {[Op.between]: [ start, end]}
        }})
        labels = []
        data = []
        Data.forEach((value) => {
            labels.push(value.date.toISOString().slice(0, 16).replace('T', ' '))
            data.push(value.close)
        })
        diff = Math.round((data[data.length - 1] * 100 / data[0] - 100)*100)/100
        current = Math.round(data[data.length - 1]*100)/100
        res.json({labels, data, current, diff})
    } catch {
        res.status(404).send();
    }
});

const start = async() => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({alter: true});
        app.listen(7000, () => console.log(`server started on 7000`));
    } catch {
        throw new Error('не удалось запустить')
    }
}
start();