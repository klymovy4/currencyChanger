import React, {useEffect, useState} from 'react';


const isEmpty =(obj)=>{
    return Object.keys(obj).length < 1
}


export const Currency = () => {
    const url = 'https://www.cbr-xml-daily.ru/daily_json.js'
    const [valuesFrom, setValuesFrom] = useState([])
    const [valuesTo, setValuesTo] = useState([])

    const [currentObjFrom, setCurrentObjFrom] = useState({})
    const [currentObjTo, setCurrentObjTo] = useState({})
    const [sum, setSum] = useState(100)

    const [isLoading, setLoading] =useState(false)
    let [totalResult, setTotalResult] = useState(100)
    // let valutes = null
    // const converter = new Proxy({}, {
    //     get(target, name) {
    //         if (target[name] !== undefined) {
    //             return target[name]
    //         }
    //
    //         const key = '_to_'
    //         const indexOfkey = name.indexOf(key)
    //         const fromCurrency = name.slice(0, indexOfkey)
    //         const toCurrency = name.slice(indexOfkey + key.length)
    //
    //         const fromNominal = valutes[fromCurrency].Nominal
    //         const fromValue = valutes[fromCurrency].Value
    //
    //         const toNominal = valutes[toCurrency].Nominal
    //         const toValue = valutes[toCurrency].Value
    //
    //         return val => val * fromValue / fromNominal / toValue
    //
    //     }
    // })


    useEffect(()=>{
        const currencyFrom = localStorage.getItem('currencyFrom')
        const currencyTo = localStorage.getItem('currencyTo')
        const currentSum = localStorage.getItem('currencySum')
        fetch(url)
            .then((response) => response.json())
            .then(data => {
                setValuesFrom(Object.values(data.Valute))
                setValuesTo( Object.values(data.Valute))
                setLoading(true)
                return Object.values(data.Valute)
            })
            .then(data => {
                setCurrentObjFrom( JSON.parse(currencyFrom) || data[0])
                setCurrentObjTo(JSON.parse(currencyTo) ||data[0])
                setSum(Number(currentSum) || 100)
            })

    },[])
    function result(fromCurrency, toCurrency, sum){
        return sum * fromCurrency.Value / fromCurrency.Nominal / toCurrency.Value * toCurrency.Nominal
    }

    useEffect(()=>{
        if(!isEmpty(currentObjTo) && !isEmpty(currentObjFrom) && sum) {
            setTotalResult(result(currentObjFrom, currentObjTo, sum))
        }
    }, [currentObjTo, currentObjFrom, sum])

    const getValueFrom =(event)=>{
        const target = event.target.value

        valuesFrom.map(el => {
            if(el.Name === target){
                localStorage.setItem('currencyFrom', JSON.stringify(el))
                setCurrentObjFrom(el)
            }
        })
    }
    const getValueTo =(event)=>{
        const target = event.target.value

        valuesTo.map(el => {
            if(el.Name === target){
                localStorage.setItem('currencyTo', JSON.stringify(el))
                setCurrentObjTo(el)
            }
        })
    }
    const getSum = event =>{
        const target = event.target.value
        setSum(target)
        localStorage.setItem('currencySum', target)
    }
    return (
        <div className='currency-main-block'>
            <div className='container'>
                <h1 className='mb-4 text-center'>Конвертер валюты</h1>
               <div className="row row-profile">
                   <div className="col-12 col-md-4 text-center d-flex align-items-center justify-content-between">
                     <div className="p-3  d-flex flex-column align-items-center justify-content-between h-100 w-100">
                             <h2>Сумма:</h2>
                             <input type="number" value={sum} className='w-100' onChange={(event) => getSum(event)}/>
                     </div>
                   </div>
                   <div className="col-12 col-md-4 text-center">
                       <div className="p-3">
                           <form>
                               <h2>Перевести из:</h2>
                               {isLoading ?  <select
                                   value={currentObjFrom.Name}
                                   id='select_1'
                                   className='w-100'
                                   onChange={event => getValueFrom(event)}>

                                   {valuesFrom.map(el => {
                                       return <option
                                           value={el.Name}
                                           key={el.ID}>{el.Name}
                                       </option>
                                   })}

                               </select>: <p>Загрузка</p>}
                           </form>
                       </div>
                   </div>
                   <div className="col-12 col-md-4 text-center">
                         <div className="p-3">
                             <form>
                                 <h2>Перевести в:</h2>
                                 {isLoading ?  <select
                                     value={currentObjTo.Name}
                                     id='select_2'
                                     className='w-100'
                                     onChange={event => getValueTo(event)}>

                                     {valuesTo.map(el => {
                                         return <option
                                             value={el.Name}
                                             key={el.ID}>{el.Name}</option>
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
