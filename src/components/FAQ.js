import React from 'react'
import { useState } from 'react'
import './FAQ.css'

export default function FAQ() {

  const [selected, setSelected] = useState(null)

  const toggle = (i) => {
     if (selected === i) {
      return setSelected(null)
    }
    setSelected(i)
  }

  return (
    <div className='wrapper'>
        <div className='accordion'>
            {data.map((item, i) => (
                <div className='item'>
                    <div className='title' onClick={() => toggle(i)}>
                      <h2>{item.question}</h2>
                      <span>{selected === i ? '-':'+'}</span>
                    </div>
                        <div className={selected === i ? 'content show':'content'}>{item.answer}</div>
                </div>
            ))}
        </div>
    </div>
  )
}

const data = [
  {
    question: 'Is CoinHub reliable in providing the most up to date Crypto prices?',
    answer: "Yes, The data we have provided is by a secure site known as CoinGecko"
  },
  {
    question:'Does CoinHub provide graphical data displayed for each Crypto?',
    answer:'Yes, CoinHub have graphical that provides a Year to date chart for a traders of all types. Such as day traders and even passive traders.'
  },
  {
    question:'Does CoinHub allow for the opportunity to trade on their platform?',
    answer:'No, unfortunately as of now CoinHub do not allow trades to happen but this may be a future feature'
  },
  {
    question:'Does CoinHub allow users to connect their Crypto wallet?',
    answer:'Yes! CoinHub offer users the ability to connect to their Crypto Wallet'
  }
]