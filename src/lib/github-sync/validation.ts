import { snapshotSchema } from './schema'
import type { Snapshot } from './schema'

export type ValidationResult =
    | { success: true; data: Snapshot }
    | { success: false; error: string }

export function validateSnapshot(snapshot: Snapshot): ValidationResult {
    const parsed = snapshotSchema.safeParse(snapshot)
    if (!parsed.success) {
        return {
            success: false,
            error: parsed.error.flatten().toString(),
        }
    }
    return { success: true, data: parsed.data as Snapshot }
}
