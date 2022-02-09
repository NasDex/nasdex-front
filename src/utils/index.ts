/** @format */
import CoinGecko from 'coingecko-api'
import BigNumber from 'bignumber.js'

export function toSignificantNew(value: any, decimals: string | number) {
  let a: any
  if (!value) return 0
  if (value.toExact) {
    a = value?.toExact()
  } else {
    a = value?.toSignificant(18)
  }

  const b = a.split('.')
  const c = b[0] > 0 ? b[0]?.length : 0
  return value?.toSignificant(decimals + c)
}

export function fixD(num: any, precision: any) {
  precision = precision > -1 ? precision : 0
  if (Number.isInteger(num)) {
    return num
  }
  if (parseInt(num) == num) {
    return num
  }
  if (`${num}` == '0') {
    return '0.0'
  }
  if (!num) {
    return ''
  }
  let flag = false
  if (parseFloat(num) < 0) {
    flag = true
  }

  const newnum = `${Math.abs(parseFloat(num))}`
  if (newnum === 'NaN') {
    return '--'
  }
  let fixNum: any = newnum
  if (newnum.toLowerCase().indexOf('e') > -1) {
    if (newnum.toLowerCase().indexOf('+') > -1) return fixDEAdd(newnum, precision)
    const a = newnum.toLowerCase().split('e')
    let b = a[0]
    const c = Math.abs(parseFloat(a[1]))
    let d = ''
    let h = b.length
    let i
    if (a[0].split('.')[1]) {
      b = a[0].split('.')[0] + a[0].split('.')[1]
      h = a[0].split('.')[0].length
    }
    for (i = 0; i < c - h; i += 1) {
      d += '0'
    }
    fixNum = `0.${d}${b}`
  }
  if (`${precision}` !== '0' && !precision) {
    return (flag ? '-' : '') + fixNum
  }
  if (`${parseFloat(num)}` === 'NaN') {
    return (flag ? '-' : '') + fixNum
  }
  const fNum = fixNum.split('.')
  if (precision === 0) {
    fixNum = parseInt(fixNum, 10)
  } else if (precision > 0 && fNum[1]) {
    if (fNum[1].length > precision) {
      if (fNum[1].indexOf('999999999') > -1) {
        const s = parseFloat(fixNum).toFixed(precision + 1)
        fixNum = s.slice(0, s.length - 1)
      } else {
        fixNum = `${fNum[0]}.${fNum[1].slice(0, precision)}`
      }
    } else {
      fixNum = parseFloat(fixNum).toFixed(precision)
    }
  } else {
    fixNum = parseFloat(fixNum).toFixed(precision)
  }
  if (fixNum.length >= 14 && fixNum.indexOf('.') > -1) {
    const arry = fixNum.split('.')
    if (arry[0].length > 14) {
      fixNum = `${arry[0].slice(0, 14)}+`
    } else {
      fixNum = fixNum.slice(0,13)
      if (fixNum.indexOf('.') === 12) {
        fixNum = fixNum.slice(0, 12)
      }
    }
  }
  const regexp = /(?:\.0*|(\.\d+?)0+)$/

  return (flag ? 0 : '') + fixNum.replace(regexp, '$1')
}

const fixDEAdd = (num: any, precision: any, autoFix = true) => {
  if (`${num}` === '0') {
    if (!parseFloat(precision) || !autoFix) return 0
    return '0.'.padEnd(precision + 2, '0')
  }
  if (!num) return '--'

  const number = parseFloat(num)
  const strN = num.toString()
  const flag = number < 0
  let result = strN

  if (strN.toLowerCase().indexOf('e') > -1) {
    const n = strN.match(/(\d+?)(?:\.(\d*))?e([+-])(\d+)/)
    const nl = n[1] 
    const nr = n[2] 
    const type = n[3] 
    const floatN = n[4] 

    let params = ''
    let pr = nr ? nr.substr(floatN) : ''

    if (pr) pr = `.${pr}`
    if (type !== '-') {
      for (let i = 0; i < floatN; i += 1) {
        const p = nr[i] || '0'
        params += p
      }
      result = nl + params + pr
    } else {
      let strl = '0'
      for (let i = 0; i < floatN; i += 1) {
        const p = nl[nl.length - i - 1] || '0'
        params = p + params
      }
      if (nl.length > floatN) strl = nl.substr(0, nl.length - floatN)
      result = `${strl}.${params}${nr}`
    }
  }

  if (precision && autoFix) {
    let pal = `${result.split('.')[0]}.`
    const par = result.split('.')[1] || ''

    for (let i = 0; i < precision; i += 1) {
      pal += par[i] || '0'
    }
    result = pal
  }

  if (result.length > 14) {
    const arry = result.split('.')
    if (arry[0].length > 14) {
      result = `${arry[0].slice(0, 14)}+`
    } else {
      result = result.slice(0, 13)
      if (result.indexOf('.') === 12) {
        result = result.slice(0, 12)
      }
    }
  }

  return `${flag ? '-' : ''}${result}`
}

export async function getpriceList(): Promise<any> {
  const CoinGeckoClient = new CoinGecko()
  const priceList = await CoinGeckoClient.simple.price({
    ids: ['nasdex-token', 'usd-coin'],
    vs_currencies: ['usd'],
  })

  const coinMap: any = {
    'nasdex-token': 'NSDX',
    'usd-coin': 'USDC',
  }
  const result: any = {}
  if (priceList && priceList.code === 200) {
    for (const [key, value] of Object.entries(priceList.data)) {
      const item: any = value
      if (item) {
        result[coinMap[key]] = item.usd || 0
      }
    }
  }
  return result
}

export function numberConversion(value: any) {
  if (!value) return 0
  const newValue = ['', '', '']
  let fr = 1000
  let num = 3
  let txt = ''
  let fm = 1
  while (value / fr >= 1) {
    fr *= 10
    num += 1
  }
  if (num <= 3) {
    newValue[0] = parseInt(value) + ''
    newValue[1] = ''
  } else if (num <= 9) {
    txt = parseInt(num - 4) / 3 >= 1 ? 'M' : 'k'
    fm = txt === 'k' ? 1000 : 1000000
    if (value % fm === 0) {
      newValue[0] = parseInt(value / fm) + ''
    } else {
      newValue[0] = parseFloat(value / fm).toFixed(2) + ''
    }
    newValue[1] = txt
  } else if (num <= 16) {
    txt = (num - 9) / 3 > 1 ? 'T' : 'B'
    fm = 1
    if (txt === 'B') {
      fm = 1000000000
    } else if (txt === 'T') {
      fm = 1000000000000
    }
    if (value % fm === 0) {
      newValue[0] = parseInt(value / fm) + ''
    } else {
      newValue[0] = parseFloat(value / fm).toFixed(2) + ''
    }
    newValue[1] = txt
  }
  if (value < 1000) {
    newValue[0] = value + ''
    newValue[1] = ''
  }
  return newValue.join('')
}


const toWei = (value:any, decimal:any) => {
    return new BigNumber(value).multipliedBy(new BigNumber(10).pow(decimal))
}
  
  
export function numToWei  (value:any, decimals:any)  {
  return new BigNumber(
    toWei(value, decimals).toNumber().toFixed(decimals)
  ).toString()
}
