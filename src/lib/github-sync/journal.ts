export type SyncEventType =
    | 'sync_started'
    | 'sync_succeeded'
    | 'sync_failed'
    | 'merge_conflict'
    | 'rollback'
    | 'repair'

export type SyncEvent = {
    timestamp: string
    type: SyncEventType
    details?: unknown
}

const MAX = 100

const buffer: SyncEvent[] = []

export function appendJournalEvent(event: Omit<SyncEvent, 'timestamp'> & { timestamp?: string }): void {
    const e: SyncEvent = {
        timestamp: event.timestamp ?? new Date().toISOString(),
        type: event.type,
        details: event.details,
    }
    buffer.push(e)
    if (buffer.length > MAX) {
        buffer.splice(0, buffer.length - MAX)
    }
    if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
        console.debug('[sync]', e.type, e.details ?? '')
    }
}

export function getJournalEvents(): readonly SyncEvent[] {
    return buffer
}

export function clearJournal(): void {
    buffer.length = 0
}
