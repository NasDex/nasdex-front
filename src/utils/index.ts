/** @format */
import CoinGecko from 'coingecko-api'

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

// 精度计算
export function fixD(num: any, precision: any) {
  precision = precision > -1 ? precision : 0
  // num初始化
  if (`${num}` === '0') {
    // if (!window.parseFloat(precision)) {
    if (!parseFloat(precision)) {
      return 0
    }
    return '0.'.padEnd(precision + 2, '0')
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
  // 科学计数法计算
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
  // 精度格式化
  // precision初始化
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
      fixNum = fixNum.slice(0, 13)
      if (fixNum.indexOf('.') === 12) {
        fixNum = fixNum.slice(0, 12)
      }
    }
  }
  return (flag ? 0 : '') + fixNum
}

// 精度计算E+处理方法
const fixDEAdd = (num: any, precision: any, autoFix = true) => {
  if (`${num}` === '0') {
    // if (!window.parseFloat(precision) || !autoFix) return 0;
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
    const nl = n[1] // 小数点左边
    const nr = n[2] // 小数点右边
    const type = n[3] //  + / -
    const floatN = n[4] // 科学计数法的位数

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
  // const CoinGeckoClient = new CoinGecko()
  // const priceList = await CoinGeckoClient.simple.price({
  //   ids: ['nasdex-token','usd-coin'],
  //   vs_currencies: ['usd'],
  // })

  // const coinMap: any = {
  //   'nasdex-token': 'NSDX',
  //   'usd-coin':'USDC'
  // }
  const result: any = {}
  // if (priceList && priceList.code === 200) {
  //   for (const [key, value] of Object.entries(priceList.data)) {
  //     const item: any = value
  //     if (item) {
  //       result[coinMap[key]] = item.usd || 0
  //     }
  //   }
  // }
  const response = await fetch('https://api.nasdex.xyz/api/v3/simple/price', {
    method: 'get',
  })
  const json = await response.json()
  if (json) {
    result.NSDX = fixD(json['nasdex-token'].usd, 4)
    result.USDC = fixD(json['usd-coin'].usd, 4)
  }
  return result
}
