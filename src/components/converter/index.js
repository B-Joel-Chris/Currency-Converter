import React, { useEffect, useState } from 'react'
import CurrencyAPI from '@everapi/currencyapi-js';
import './styles.css'
import{CgArrowsExchangeV} from 'react-icons/cg'
const Converter = () => {

    const apiKey = "cur_live_jl1aTcxJ28QdvipooVOymGfMR7ZPosDBaAVvCN3n";
    const currencyApi = new CurrencyAPI(apiKey);

    const [vals, setVals] = useState({
        base_currency: "SGD",
        currencies: "USD"
    });

    const [result, setResult] = useState(null)
    const [convertedAmount, setConvertedAmount] = useState(0)

    const calculate = () => {

        currencyApi.latest(vals).then((res) => {
            setResult(res.data)

        })
    }

    const displayResult = () => {
        if (result != null && result[vals.currencies]) {
            const rate = result[vals.currencies].value
            return ` 1 ${vals.base_currency} =  ${rate.toFixed(2)} ${vals.currencies}`
        }
        return '';
    }

    const calcAmount = () => {
        const baseAmount = vals.amount
        if (result != null && result[vals.currencies]) {
            const rate = result[vals.currencies].value
            console.log(baseAmount * rate);
            setConvertedAmount(baseAmount * rate)

        }
    }

    useEffect(() => {
        calcAmount()
    }, [result])

    return (
        <div className='container'>
            <div className='modal'>

                    <h3>Amount</h3>
                <div className='amount_container'>
                    <select id='selectBox'
                        name='amount'
                        value={vals.base_currency}
                        onChange={e => setVals({ ...vals, base_currency: e.target.value })}
                    >
                        <option value="EUR">EUR</option>
                        <option value="CAD">CAD</option>
                        <option value="INR">INR</option>
                        <option value="AED">AED</option>
                        <option value="SGD">SGD</option>
                        <option value="USD">USD</option>



                    </select>
                    <input type="number" onChange={e => setVals({ ...vals, amount: e.target.value })} />
                </div>
                <button className='exchange' onClick={calculate}><CgArrowsExchangeV size={20}/></button>
                <hr class="horizontal-line"/>
                    <h3>Converted Amount</h3>
                <div className='converted_amount_container'>
                    <select
                    id='selectBox'
                        name='amount'
                        value={vals.currencies}
                        onChange={e => setVals({ ...vals, currencies: e.target.value })}
                    >
                        <option value="EUR">EUR</option>
                        <option value="CAD">CAD</option>
                        <option value="INR">INR</option>
                        <option value="AED">AED</option>
                        <option value="SGD">SGD</option>
                        <option value="USD">USD</option>
                    </select>
                    <input type="number" value={convertedAmount.toFixed(2)} />
                </div>
            </div>
            <div className='result'>
                <h3>Indicative Exchange Rate</h3>
                <p>
                    {displayResult()}
                </p>
            </div>
        </div>
    )
}

export default Converter