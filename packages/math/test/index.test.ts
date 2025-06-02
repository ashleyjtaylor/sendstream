import { add } from '../src/index.js'

describe('add', () => {
  it('adds two positive numbers', () => {
    expect(add(2, 3)).toBe(5)
  })

  it('adds positive and negative numbers', () => {
    expect(add(10, -4)).toBe(6)
  })

  it('adds two negative numbers', () => {
    expect(add(-3, -7)).toBe(-10)
  })

  it('adds zero', () => {
    expect(add(0, 5)).toBe(5)
    expect(add(0, 0)).toBe(0)
  })
})
