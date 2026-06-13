import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { SettingsSidebar } from './SettingsSidebar'
import { EasterEggSettingsSection } from './settings-section-easter-egg'

class MemoryStorage {
  private values = new Map<string, string>()

  getItem(key: string): string | null {
    return this.values.get(key) ?? null
  }

  setItem(key: string, value: string): void {
    this.values.set(key, value)
  }
}

const originalLocalStorage = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')

function restoreLocalStorage(): void {
  if (originalLocalStorage) {
    Object.defineProperty(globalThis, 'localStorage', originalLocalStorage)
  } else {
    Reflect.deleteProperty(globalThis, 'localStorage')
  }
}

const labels: Record<string, string> = {
  back: 'Back',
  general: 'General',
  providers: 'Providers',
  write: 'Write',
  imageGen: 'Image generation',
  speechToText: 'Speech to text',
  agents: 'AI assistant',
  keyboardShortcuts: 'Keyboard shortcuts',
  easterEgg: 'Easter eggs',
  claw: 'Connect phone',
  settingsFooter: 'Settings',
  easterEggSection: 'Hidden extras',
  ikunModeTitle: 'iKun mode',
  ikunModeDesc: 'Switches the workspace mascot and cameo animations.',
  ikunModeToggleLabel: 'Toggle iKun mode',
  ikunMode: 'iKun',
  switchOn: 'On',
  switchOff: 'Off'
}

function t(key: string): string {
  return labels[key] ?? key
}

describe('EasterEggSettingsSection', () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: new MemoryStorage()
    })
  })

  afterEach(() => {
    restoreLocalStorage()
  })

  it('renders iKun mode inside the easter egg settings section', () => {
    const html = renderToStaticMarkup(createElement(EasterEggSettingsSection, {
      ctx: {
        t,
        tCommon: t
      }
    }))

    expect(html).toContain('Hidden extras')
    expect(html).toContain('iKun mode')
    expect(html).toContain('Switches the workspace mascot')
    expect(html).toContain('role="switch"')
    expect(html).toContain('aria-checked="false"')
    expect(html).toContain('Off')
  })

  it('adds an easter egg tab to the settings sidebar', () => {
    const html = renderToStaticMarkup(createElement(SettingsSidebar, {
      category: 'easterEgg',
      goBack: () => undefined,
      setCategory: () => undefined,
      t
    }))

    expect(html).toContain('Easter eggs')
    expect(html).toContain('bg-ds-subtle')
  })
})
