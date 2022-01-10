/** @format */

'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g
    return (
      (g = {next: verb(0), throw: verb(1), return: verb(2)}),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return function (v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return {value: op[1], done: false}
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return {value: op[0] ? op[1] : void 0, done: true}
    }
  }
exports.__esModule = true
exports.getpriceList = exports.fixD = exports.toSignificantNew = void 0
function toSignificantNew(value, decimals) {
  var _a
  var a
  if (!value) return 0
  if (value.toExact) {
    a = value === null || value === void 0 ? void 0 : value.toExact()
  } else {
    a = value === null || value === void 0 ? void 0 : value.toSignificant(18)
  }
  var b = a.split('.')
  var c = b[0] > 0 ? ((_a = b[0]) === null || _a === void 0 ? void 0 : _a.length) : 0
  return value === null || value === void 0 ? void 0 : value.toSignificant(decimals + c)
}
exports.toSignificantNew = toSignificantNew
// 精度计算
function fixD(num, precision) {
  precision = precision > -1 ? precision : 0
  // num初始化
  if (Number.isInteger(num)) {
    return num
  }
  if (parseInt(num) == num) {
    return num
  }
  if ('' + num === '0') {
    return '0.0'
    // if (!window.parseFloat(precision)) {
    // if (!parseFloat(precision)) {
    //   return 0
    // }
    // return '0.'.padEnd(precision + 2, '0')
  }
  if (!num) {
    return ''
  }
  var flag = false
  if (parseFloat(num) < 0) {
    flag = true
  }
  var newnum = '' + Math.abs(parseFloat(num))
  if (newnum === 'NaN') {
    return '--'
  }
  var fixNum = newnum
  // 科学计数法计算
  if (newnum.toLowerCase().indexOf('e') > -1) {
    if (newnum.toLowerCase().indexOf('+') > -1) return fixDEAdd(newnum, precision)
    var a = newnum.toLowerCase().split('e')
    var b = a[0]
    var c = Math.abs(parseFloat(a[1]))
    var d = ''
    var h = b.length
    var i = void 0
    if (a[0].split('.')[1]) {
      b = a[0].split('.')[0] + a[0].split('.')[1]
      h = a[0].split('.')[0].length
    }
    for (i = 0; i < c - h; i += 1) {
      d += '0'
    }
    fixNum = '0.' + d + b
  }
  // 精度格式化
  // precision初始化
  if ('' + precision !== '0' && !precision) {
    return (flag ? '-' : '') + fixNum
  }
  if ('' + parseFloat(num) === 'NaN') {
    return (flag ? '-' : '') + fixNum
  }
  var fNum = fixNum.split('.')
  if (precision === 0) {
    fixNum = parseInt(fixNum, 10)
  } else if (precision > 0 && fNum[1]) {
    if (fNum[1].length > precision) {
      if (fNum[1].indexOf('999999999') > -1) {
        var s = parseFloat(fixNum).toFixed(precision + 1)
        fixNum = s.slice(0, s.length - 1)
      } else {
        fixNum = fNum[0] + '.' + fNum[1].slice(0, precision)
      }
    } else {
      fixNum = parseFloat(fixNum).toFixed(precision)
    }
  } else {
    fixNum = parseFloat(fixNum).toFixed(precision)
  }
  if (fixNum.length >= 14 && fixNum.indexOf('.') > -1) {
    var arry = fixNum.split('.')
    if (arry[0].length > 14) {
      fixNum = arry[0].slice(0, 14) + '+'
    } else {
      fixNum = fixNum.slice(0, 13)
      if (fixNum.indexOf('.') === 12) {
        fixNum = fixNum.slice(0, 12)
      }
    }
  }
  var regexp = /(?:\.0*|(\.\d+?)0+)$/
  return (flag ? 0 : '') + fixNum.replace(regexp, '$1')
}
exports.fixD = fixD
// 精度计算E+处理方法
var fixDEAdd = function (num, precision, autoFix) {
  if (autoFix === void 0) {
    autoFix = true
  }
  if ('' + num === '0') {
    // if (!window.parseFloat(precision) || !autoFix) return 0;
    if (!parseFloat(precision) || !autoFix) return 0
    return '0.'.padEnd(precision + 2, '0')
  }
  if (!num) return '--'
  var number = parseFloat(num)
  var strN = num.toString()
  var flag = number < 0
  var result = strN
  if (strN.toLowerCase().indexOf('e') > -1) {
    var n = strN.match(/(\d+?)(?:\.(\d*))?e([+-])(\d+)/)
    var nl = n[1] // 小数点左边
    var nr = n[2] // 小数点右边
    var type = n[3] //  + / -
    var floatN = n[4] // 科学计数法的位数
    var params = ''
    var pr = nr ? nr.substr(floatN) : ''
    if (pr) pr = '.' + pr
    if (type !== '-') {
      for (var i = 0; i < floatN; i += 1) {
        var p = nr[i] || '0'
        params += p
      }
      result = nl + params + pr
    } else {
      var strl = '0'
      for (var i = 0; i < floatN; i += 1) {
        var p = nl[nl.length - i - 1] || '0'
        params = p + params
      }
      if (nl.length > floatN) strl = nl.substr(0, nl.length - floatN)
      result = strl + '.' + params + nr
    }
  }
  if (precision && autoFix) {
    var pal = result.split('.')[0] + '.'
    var par = result.split('.')[1] || ''
    for (var i = 0; i < precision; i += 1) {
      pal += par[i] || '0'
    }
    result = pal
  }
  if (result.length > 14) {
    var arry = result.split('.')
    if (arry[0].length > 14) {
      result = arry[0].slice(0, 14) + '+'
    } else {
      result = result.slice(0, 13)
      if (result.indexOf('.') === 12) {
        result = result.slice(0, 12)
      }
    }
  }
  return '' + (flag ? '-' : '') + result
}
function getpriceList() {
  return __awaiter(this, void 0, Promise, function () {
    var result, response, json
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          result = {}
          return [
            4 /*yield*/,
            fetch('https://api.nasdex.xyz/api/v3/simple/price', {
              method: 'get',
            }),
          ]
        case 1:
          response = _a.sent()
          return [4 /*yield*/, response.json()]
        case 2:
          json = _a.sent()
          if (json) {
            result.NSDX = fixD(json['nasdex-token'].usd, 4)
            result.USDC = fixD(json['usd-coin'].usd, 4)
          }
          return [2 /*return*/, result]
      }
    })
  })
}
exports.getpriceList = getpriceList
