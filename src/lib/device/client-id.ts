const STORAGE_KEY = 'kanban-client-id'

export function getClientId(): string {
    if (typeof window === 'undefined') {
        return ''
    }
    try {
        let id = window.localStorage.getItem(STORAGE_KEY)
        if (!id) {
            id =
                typeof crypto !== 'undefined' && crypto.randomUUID
                    ? crypto.randomUUID()
                    : `kanban-${Date.now()}-${Math.random().toString(36).slice(2)}`
            window.localStorage.setItem(STORAGE_KEY, id)
        }
        return id
    } catch {
        return 'unknown-client'
    }
}
