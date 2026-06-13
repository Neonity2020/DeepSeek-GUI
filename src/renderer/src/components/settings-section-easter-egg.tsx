import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'
import { readIkunModePreference, writeIkunModePreference } from '../lib/ikun-mode'
import ikunStandFigure from '../../../asset/img/ikun_stand.png'
import { SettingsCard, SettingRow } from './settings-controls'

export function EasterEggSettingsSection({ ctx }: { ctx: Record<string, any> }): ReactElement {
  const { t, tCommon } = ctx
  const [ikunModeEnabled, setIkunModeEnabled] = useState(readIkunModePreference)

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.setAttribute('data-ikun-mode', ikunModeEnabled ? 'on' : 'off')
  }, [ikunModeEnabled])

  const toggleIkunMode = (): void => {
    setIkunModeEnabled((enabled) => {
      const next = !enabled
      writeIkunModePreference(next)
      return next
    })
  }

  return (
    <SettingsCard title={t('easterEggSection')}>
      <SettingRow
        title={t('ikunModeTitle')}
        description={t('ikunModeDesc')}
        control={
          <button
            type="button"
            role="switch"
            aria-checked={ikunModeEnabled}
            aria-label={t('ikunModeToggleLabel')}
            onClick={toggleIkunMode}
            className={`group flex min-h-[42px] w-full min-w-0 items-center gap-3 rounded-xl border px-3 py-2 text-left text-[14px] shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-accent/30 ${
              ikunModeEnabled
                ? 'border-orange-300/80 bg-orange-50 text-orange-950 dark:border-orange-400/30 dark:bg-orange-400/15 dark:text-orange-100'
                : 'border-ds-border bg-ds-card text-ds-muted hover:bg-ds-hover hover:text-ds-ink'
            }`}
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${
                ikunModeEnabled
                  ? 'bg-orange-100 text-orange-600 shadow-[inset_0_0_0_1px_rgba(249,115,22,0.18)] dark:bg-orange-300/20 dark:text-orange-100'
                  : 'bg-ds-subtle text-ds-muted group-hover:text-ds-ink'
              }`}
            >
              <img
                src={ikunStandFigure}
                alt=""
                className={`ds-ikun-toggle-figure ${ikunModeEnabled ? 'is-on' : ''}`}
                draggable={false}
                decoding="async"
              />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-semibold">{tCommon('ikunMode')}</span>
              <span className="mt-0.5 block truncate text-[12px] text-ds-faint">
                {ikunModeEnabled ? tCommon('switchOn') : tCommon('switchOff')}
              </span>
            </span>
            <span
              className={`relative h-[22px] w-[40px] shrink-0 rounded-full transition ${
                ikunModeEnabled
                  ? 'bg-orange-500 shadow-[inset_0_0_0_1px_rgba(194,65,12,0.18)]'
                  : 'bg-slate-300/70 shadow-[inset_0_0_0_1px_rgba(100,116,139,0.18)] dark:bg-white/[0.14] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]'
              }`}
              aria-hidden="true"
            >
              <span
                className={`absolute top-[3px] h-4 w-4 rounded-full bg-white shadow-[0_1px_3px_rgba(20,47,95,0.24)] transition-transform ${
                  ikunModeEnabled ? 'translate-x-[21px]' : 'translate-x-[3px]'
                }`}
              />
            </span>
          </button>
        }
      />
    </SettingsCard>
  )
}
