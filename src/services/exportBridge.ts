export interface ExportSessionStatusPayload {
  inProgressSessionIds: string[]
  activeTaskCount: number
}

const EXPORT_SESSION_STATUS_EVENT = 'weflow:export-session-status'
const EXPORT_SESSION_STATUS_REQUEST_EVENT = 'weflow:export-session-status-request'

export const emitExportSessionStatus = (payload: ExportSessionStatusPayload) => {
  window.dispatchEvent(new CustomEvent<ExportSessionStatusPayload>(EXPORT_SESSION_STATUS_EVENT, {
    detail: payload
  }))
}

export const onExportSessionStatus = (
  listener: (payload: ExportSessionStatusPayload) => void
): (() => void) => {
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<ExportSessionStatusPayload>
    listener(customEvent.detail)
  }

  window.addEventListener(EXPORT_SESSION_STATUS_EVENT, handler as EventListener)
  return () => window.removeEventListener(EXPORT_SESSION_STATUS_EVENT, handler as EventListener)
}

export const requestExportSessionStatus = () => {
  window.dispatchEvent(new CustomEvent(EXPORT_SESSION_STATUS_REQUEST_EVENT))
}

export const onExportSessionStatusRequest = (listener: () => void): (() => void) => {
  const handler = () => listener()
  window.addEventListener(EXPORT_SESSION_STATUS_REQUEST_EVENT, handler)
  return () => window.removeEventListener(EXPORT_SESSION_STATUS_REQUEST_EVENT, handler)
}
