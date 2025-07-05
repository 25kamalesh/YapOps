import { describe, it, expect } from 'vitest'
import { formatMessageTime } from '../lib/utils'

describe('Utils Functions', () => {
  describe('formatMessageTime', () => {
    it('should format date to time string', () => {
      const testDate = new Date('2024-01-01T14:30:00Z')
      const formattedTime = formatMessageTime(testDate)
      
      // The result will depend on timezone, so we just check the format
      expect(formattedTime).toMatch(/^\d{2}:\d{2}$/)
    })

    it('should handle string date input', () => {
      const testDateString = '2024-01-01T09:15:00Z'
      const formattedTime = formatMessageTime(testDateString)
      
      expect(formattedTime).toMatch(/^\d{2}:\d{2}$/)
    })

    it('should handle current date', () => {
      const now = new Date()
      const formattedTime = formatMessageTime(now)
      
      expect(formattedTime).toMatch(/^\d{2}:\d{2}$/)
      expect(formattedTime).toBeDefined()
    })
  })
})
