# GitHub sync module — invariants

Non‑negotiable boundaries for maintainability and correctness:

1. **Entities** carry `revision`, `updatedAt`, `lastModifiedByClientId` (and related metadata). Legacy rows are normalized at export/repair time.
2. **All mutations** that affect synced data go through `src/lib/domain/*`. UI components must not call Zustand `set*` methods on data stores directly.
3. **No partial snapshot application** — `applySnapshot` updates every related slice in one batched transaction or aborts before committing.
4. **Remote snapshots** are ingested only via `migrateSnapshot → repairSnapshot → validateSnapshot` (`prepareInboundSnapshot`).
5. **Tombstones win over stale live rows** when ordering says the delete is newer (see `merge.ts` + `compare.ts`).
6. **`SyncProvider` / GitHub REST** run only on the server in Route Handlers; the browser talks to `/api/github/*` only.
7. **`compareEntityVersions`** is the single ordering primitive for concurrent edits (besides explicit tombstone-vs-live rules).
8. **Optimistic sync**: merged snapshots apply locally before push; fatal push failure rolls back to the pre-sync backup (`sync.ts`).
