import { cleanerString } from './cleanerString'

it('CleanerString callback value correctly', () => {
  const val = 'Test 12 string'
  const str = cleanerString(val)
  const number = cleanerString(val, 'onlyNumber')

  expect(str).toBe(val)
  expect(number).not.toBe(val)
  expect(number).toBe(val.replace(/\D+/g, ''))
})
