/** @format */

class Precision {
  times(num1, num2, ...others) {
    if (others.length > 0) {
      return this.times(this.times(num1, num2), ...others)
    }
    num1 = num1 || 0
    num2 = num2 || 0
    const num1Changed = this.float2Fixed(num1)
    const num2Changed = this.float2Fixed(num2)
    const baseNum = this.digitLength(num1) + this.digitLength(num2)
    const leftValue = num1Changed * num2Changed
    return leftValue / Math.pow(10, baseNum)
  }
  plus(num1, num2, ...others) {
    if (others.length > 0) {
      return this.plus(this.plus(num1, num2), ...others)
    }
    const baseNum = Math.pow(10, Math.max(this.digitLength(num1), this.digitLength(num2)))
    return (this.times(num1, baseNum) + this.times(num2, baseNum)) / baseNum
  }
  minus(num1, num2, ...others) {
    if (others.length > 0) {
      return this.minus(this.minus(num1, num2), ...others)
    }
    const baseNum = Math.pow(10, Math.max(this.digitLength(num1), this.digitLength(num2)))
    return (this.times(num1, baseNum) - this.times(num2, baseNum)) / baseNum
  }
  divide(num1, num2, ...others) {
    if (others.length > 0) {
      return this.divide(this.divide(num1, num2), ...others)
    }
    const num1Change = this.float2Fixed(num1)
    const num2Change = this.float2Fixed(num2)
    return this.times(num1Change / num2Change, Math.pow(10, this.digitLength(num2) - this.digitLength(num1)))
  }
  divide2(arg1, arg2) {
    let t1 = 0
    let t2 = 0
    let r1, r2
    try {
      t1 = arg1.toString().split('.')[1].length
    } catch (e) {}
    try {
      t2 = arg2.toString().split('.')[1].length
    } catch (e) {}
    r1 = Number(arg1.toString().replace('.', ''))
    r2 = Number(arg2.toString().replace('.', ''))
    return (r1 / r2) * Math.pow(10, t2 - t1)
  }
  round(num, ratio) {
    const base = Math.pow(10, ratio)
    return this.divide(Math.round(this.times(num, base)), base)
  }
  float2Fixed(num) {
    if (num && !~num.toString().indexOf('e')) {
      return Number(num.toString().replace('.', ''))
    }
    const dlen = this.digitLength(num)
    return dlen > 0 ? num * Math.pow(10, dlen) : num
  }
  digitLength(num) {
    const eSplit = num && num.toString().split(/[eE]/)
    const len = eSplit && (eSplit[0].split('.')[1] || '').length - (+eSplit[1] || 0)
    return len > 0 ? len : 0
  }
  checkBoundary(num) {
    if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
      console.log(`${num} is beyond boundary when transfer to integer, the results may not be accurate`)
    }
  }
}

export default new Precision()
