import { appendJournalEvent } from './journal'
import { coerceSnapshot, migrateSnapshot } from './migrate'
import { repairSnapshot } from './repair'
import type { Snapshot } from './schema'
import { validateSnapshot } from './validation'

export type PreparedSnapshot =
    | { ok: true; snapshot: Snapshot; repairLogs: ReturnType<typeof repairSnapshot>['logs'] }
    | { ok: false; error: string }

export function prepareInboundSnapshot(raw: unknown): PreparedSnapshot {
    try {
        const coerced = coerceSnapshot(raw)
        const migrated = migrateSnapshot(coerced)
        const repaired = repairSnapshot(migrated)
        for (const log of repaired.logs) {
            appendJournalEvent({ type: 'repair', details: log })
        }
        const validated = validateSnapshot(repaired.snapshot)
        if (!validated.success) {
            return { ok: false, error: validated.error }
        }
        return {
            ok: true,
            snapshot: validated.data,
            repairLogs: repaired.logs,
        }
    } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e)
        return { ok: false, error: msg }
    }
}
