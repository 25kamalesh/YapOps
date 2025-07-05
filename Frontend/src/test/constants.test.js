import { describe, it, expect } from 'vitest'
import { THEMES } from '../constants/index'

describe('Constants', () => {
  describe('THEMES', () => {
    it('should contain valid theme names', () => {
      expect(THEMES).toBeDefined()
      expect(Array.isArray(THEMES)).toBe(true)
      expect(THEMES.length).toBeGreaterThan(0)
    })

    it('should contain expected themes', () => {
      const expectedThemes = ['light', 'dark', 'cupcake', 'bumblebee']
      expectedThemes.forEach(theme => {
        expect(THEMES).toContain(theme)
      })
    })

    it('should have all themes as strings', () => {
      THEMES.forEach(theme => {
        expect(typeof theme).toBe('string')
        expect(theme.length).toBeGreaterThan(0)
      })
    })

    it('should not have duplicate themes', () => {
      const uniqueThemes = [...new Set(THEMES)]
      expect(uniqueThemes).toHaveLength(THEMES.length)
    })
  })
})
