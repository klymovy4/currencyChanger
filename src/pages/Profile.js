import React, {useEffect, useState} from 'react';

export const Profile = () => {
    const url = 'https://www.cbr-xml-daily.ru/daily_json.js'
    const [valueFrom, setValueFrom] = useState([])
    const [valueTo, setValueTo] = useState([])

    const [arrFrom, setArrFrom] = useState({})
    const [arrTo, setArrTo] = useState({})
    const [sum, setSum] = useState(100)

    const [isLoading, setLoading] =useState(false)
    let [totalResult, setTotalResult] = useState(100)
    let valutes = null
    const converter = new Proxy({}, {
        get(target, name) {
            // console.log('1', target, name)
            if (target[name] !== undefined) {
                return target[name]
            }

            const key = '_to_'
            const indexOfkey = name.indexOf(key)
            const fromCurrency = name.slice(0, indexOfkey)
            const toCurrency = name.slice(indexOfkey + key.length)

            const fromNominal = valutes[fromCurrency].Nominal
            const fromValue = valutes[fromCurrency].Value

            const toNominal = valutes[toCurrency].Nominal
            const toValue = valutes[toCurrency].Value

            return val => val * fromValue / fromNominal / toValue

        }
    })

    useEffect(()=>{
        fetch(url)
            .then((response)=> response.json())
            .then(data => {
                setValueFrom(Object.values(data.Valute))
                setValueTo(Object.values(data.Valute))
                setLoading(true)
                return Object.values(data.Valute)
            })
            .then(data=> {
                setArrFrom(data[0])
                setArrTo(data[0])
            })
    },[])

    function result(fromCurrency, toCurrency, sum){
        return sum * fromCurrency.Value / fromCurrency.Nominal / toCurrency.Value * toCurrency.Nominal
    }
    // function calculate(){
    //     setTotalResult(result(arrFrom, arrTo, sum))
    // }

    useEffect(()=>{
        if(arrTo && arrFrom && sum){
            // calculate()
            setTotalResult(result(arrFrom, arrTo, sum))
        }

    }, [arrTo, arrFrom, sum])

    const getValueFrom =(event)=>{
        const target = event.target.value
        valueFrom.map(el => {
            if(el.ID === target){
                setArrFrom(el)
            }
        })
    }
    const getValueTo =(event)=>{
        const target = event.target.value
        valueTo.map(el => {
            if(el.ID === target){
                setArrTo(el)
            }
        })
    }

    return (
        <div className='currency-main-block'>
            <div className='container'>
                <h1 className='mb-4 text-center'>Конвертер валюты</h1>
               <div className="row row-profile">
                   <div className="col-12 col-md-4 text-center d-flex align-items-center justify-content-between">
                     <div className="p-3  d-flex flex-column align-items-center justify-content-between h-100 w-100">
                             <h2>Сумма:</h2>
                             <input type="number" value={sum} className='w-100' onChange={event => {
                                 setSum(event.target.value)
                             }}/>
                     </div>
                   </div>
                   <div className="col-12 col-md-4 text-center">
                       <div className="p-3">
                           <form>
                               <h2>Перевести из:</h2>
                               {isLoading ?  <select  id='select_1' className='w-100' onChange={event => getValueFrom(event)}>

                                   {valueFrom.map(el => {
                                       return <option value={el.ID} key={el.ID}>{el.Name}</option>
                                   })}

                               </select>: <p>Загрузка</p>}
                           </form>
                       </div>
                   </div>
                   <div className="col-12 col-md-4 text-center">
                     <div className="p-3">
                         <form>
                             <h2>Перевести в:</h2>
                             {isLoading ?  <select id='select_2' className='w-100' onChange={event => getValueTo(event)}>

                                 {valueTo.map(el => {
                                     return <option value={el.ID} key={el.ID}>{el.Name}</option>
                                 })}

                             </select>: <p>Загрузка</p>}
                         </form>
                     </div>
                   </div>
                   <h3>{totalResult.toFixed(2)}</h3>
               </div>
            </div>
        </div>
    )
}
