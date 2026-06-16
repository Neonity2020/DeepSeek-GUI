import { desktopCapturer, shell, systemPreferences } from 'electron'

export type ComputerUsePermissionState = 'granted' | 'denied' | 'unknown'

export type ComputerUsePermissions = {
  platform: NodeJS.Platform
  /** Whether the host backend can run on this platform at all. */
  supported: boolean
  /** Whether the OS gates input/capture behind a permission prompt (macOS). */
  needsPermission: boolean
  /** Accessibility permission (controls mouse/keyboard injection on macOS). */
  accessibility: ComputerUsePermissionState
  /** Screen Recording permission (controls screenshots on macOS). */
  screenRecording: ComputerUsePermissionState
}

/**
 * Report the host-control OS permission status. On macOS, computer-use
 * needs Accessibility (input injection) and Screen Recording (capture);
 * on Windows/Linux no special permission gate applies. Checks are
 * read-only — they never trigger a system prompt.
 */
export function getComputerUsePermissions(): ComputerUsePermissions {
  const platform = process.platform
  if (platform !== 'darwin') {
    return {
      platform,
      supported: true,
      needsPermission: false,
      accessibility: 'granted',
      screenRecording: 'granted'
    }
  }
  let accessibility: ComputerUsePermissionState = 'unknown'
  try {
    accessibility = systemPreferences.isTrustedAccessibilityClient(false) ? 'granted' : 'denied'
  } catch {
    accessibility = 'unknown'
  }
  let screenRecording: ComputerUsePermissionState = 'unknown'
  try {
    const status = systemPreferences.getMediaAccessStatus('screen')
    screenRecording = status === 'granted' ? 'granted' : status === 'not-determined' ? 'unknown' : 'denied'
  } catch {
    screenRecording = 'unknown'
  }
  return { platform, supported: true, needsPermission: true, accessibility, screenRecording }
}

/**
 * Nudge the user toward granting a host-control permission on macOS:
 * Accessibility shows the native "add to Accessibility" prompt; Screen
 * Recording opens the relevant System Settings pane (there is no
 * programmatic grant API for it). Returns the refreshed status.
 */
export async function requestComputerUsePermission(
  kind: 'accessibility' | 'screenRecording'
): Promise<ComputerUsePermissions> {
  if (process.platform === 'darwin') {
    try {
      if (kind === 'accessibility') {
        // Passing true shows the system prompt to add the app.
        systemPreferences.isTrustedAccessibilityClient(true)
      } else {
        // macOS only lists an app under Screen Recording once it has
        // attempted a capture. Trigger a one-shot capture from this (the
        // app bundle) process so the entry appears; the kun child shares
        // the same signed bundle and inherits the grant. Then open the pane.
        try {
          await desktopCapturer.getSources({ types: ['screen'], thumbnailSize: { width: 1, height: 1 } })
        } catch {
          // Ignore — registration is best effort.
        }
        await shell.openExternal(
          'x-apple.systempreferences:com.apple.preference.security?Privacy_ScreenCapture'
        )
      }
    } catch {
      // Best effort — fall through to returning the current status.
    }
  }
  return getComputerUsePermissions()
}
