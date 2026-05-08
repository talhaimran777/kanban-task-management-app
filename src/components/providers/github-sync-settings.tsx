'use client'

import { useCallback, useEffect, useState } from 'react'
import Button from 'src/components/ui/custom/button'
import Typography from 'src/components/ui/custom/typography'
import { cancelAutoSyncTimers, markDirtyAndScheduleSync } from 'src/lib/github-sync/scheduler'
import { syncWithGitHub } from 'src/lib/github-sync/sync'
import useGitHubRepoSettings from 'src/store/github-settings'
import useSyncCoordinator from 'src/store/sync'
import { cn } from 'src/utils'

export type GithubSyncSettingsProps = {
    className?: string
}

export function GithubSyncSettings({ className }: GithubSyncSettingsProps) {
    const [sessionLogin, setSessionLogin] = useState<string | null>(null)
    const [scopeHint, setScopeHint] = useState<string | null>(null)
    const [repoList, setRepoList] = useState<{ fullName: string }[]>([])
    const [busy, setBusy] = useState(false)

    const { owner, repo, path, setRepoTarget, clear } = useGitHubRepoSettings()
    const { syncStatus, syncError, lastSyncedAt, hasUnsyncedChanges, isSyncing } =
        useSyncCoordinator()

    const refreshSession = useCallback(async () => {
        const res = await fetch('/api/github/session', { credentials: 'include' })
        const j = (await res.json()) as {
            loggedIn?: boolean
            login?: string | null
            oauthScopes?: string[]
            repoScopeGranted?: boolean
            publicRepoScopeOnly?: boolean
            scopeCheckStatus?: number
            scopesUnknown?: boolean
        }
        setSessionLogin(j.loggedIn && j.login ? j.login : null)
        if (j.loggedIn) {
            if (j.scopeCheckStatus && j.scopeCheckStatus !== 200) {
                setScopeHint(
                    `Could not verify token with GitHub (HTTP ${j.scopeCheckStatus}). Try reconnect.`
                )
            } else if (j.scopesUnknown) {
                setScopeHint(null)
            } else if ((j.oauthScopes?.length ?? 0) === 0) {
                setScopeHint('OAuth scopes could not be read. Disconnect and connect again.')
            } else if (!j.repoScopeGranted && j.publicRepoScopeOnly) {
                setScopeHint(
                    'Token has only public_repo — pushing to a private repository requires the full repo scope. Revoke the OAuth app on GitHub and reconnect to approve repo access.'
                )
            } else if (!j.repoScopeGranted) {
                setScopeHint(
                    'Token is missing the repo scope. Revoke this OAuth app on GitHub (Settings → Applications) and reconnect; approve repository access on the GitHub consent screen.'
                )
            } else {
                setScopeHint(null)
            }
        } else {
            setScopeHint(null)
        }
    }, [])

    const refreshRepos = useCallback(async () => {
        const res = await fetch('/api/github/repos', { credentials: 'include' })
        if (!res.ok) return
        const j = (await res.json()) as { repos?: { fullName: string }[] }
        setRepoList(j.repos ?? [])
    }, [])

    useEffect(() => {
        void refreshSession()
    }, [refreshSession])

    useEffect(() => {
        if (sessionLogin) {
            void refreshRepos()
        }
    }, [sessionLogin, refreshRepos])

    const connect = () => {
        window.location.href = '/api/auth/github'
    }

    const logout = async () => {
        cancelAutoSyncTimers()
        await fetch('/api/auth/github/logout', { method: 'POST', credentials: 'include' })
        clear()
        setSessionLogin(null)
        setRepoList([])
        setScopeHint(null)
    }

    const createRepo = async () => {
        const name = window.prompt('New private repository name')
        if (!name?.trim()) return
        setBusy(true)
        try {
            const res = await fetch('/api/github/repos', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim(), private: true }),
            })
            const j = (await res.json()) as { ok?: boolean; owner?: string; repo?: string; error?: string }
            if (!j.ok || !j.owner || !j.repo) {
                alert(j.error ?? 'Could not create repository')
                return
            }
            setRepoTarget({ owner: j.owner, repo: j.repo, path: 'kanban-sync.json' })
            markDirtyAndScheduleSync()
            await refreshRepos()
        } finally {
            setBusy(false)
        }
    }

    const manualSync = async () => {
        setBusy(true)
        try {
            await syncWithGitHub({ manual: true })
        } finally {
            setBusy(false)
        }
    }

    const saveRepoSettings = () => {
        setRepoTarget({ owner: owner.trim(), repo: repo.trim(), path: path.trim() || 'kanban-sync.json' })
        markDirtyAndScheduleSync()
    }

    const pickRepo = (fullName: string) => {
        const [o, r] = fullName.split('/')
        if (o && r) {
            setRepoTarget({ owner: o, repo: r, path: path || 'kanban-sync.json' })
            markDirtyAndScheduleSync()
        }
    }

    return (
        <div className={cn('flex flex-col gap-3', className)}>
            {sessionLogin ? (
                <Typography
                    text={`Signed in as ${sessionLogin}`}
                    variant='body'
                    size='small'
                    className='text-grey-ternary'
                />
            ) : (
                <Typography
                    text='Connect your GitHub account to sync JSON data.'
                    variant='body'
                    size='small'
                    className='text-grey-ternary'
                />
            )}

            {sessionLogin && scopeHint && (
                <Typography
                    text={scopeHint}
                    variant='body'
                    size='small'
                    className='text-red-primary'
                />
            )}

            <div className='flex flex-col gap-2'>
                {!sessionLogin ? (
                    <Button text='Connect GitHub' variant='primary' size='small' onClick={connect} />
                ) : (
                    <Button text='Disconnect' variant='secondary' size='small' onClick={() => void logout()} />
                )}
            </div>

            <label className='text-xs text-grey-ternary'>Owner</label>
            <input
                className='rounded border border-lines-light dark:border-lines-dark px-2 py-1 text-sm bg-transparent'
                value={owner}
                onChange={(e) => setRepoTarget({ owner: e.target.value, repo, path })}
            />
            <label className='text-xs text-grey-ternary'>Repository</label>
            <input
                className='rounded border border-lines-light dark:border-lines-dark px-2 py-1 text-sm bg-transparent'
                value={repo}
                onChange={(e) => setRepoTarget({ owner, repo: e.target.value, path })}
            />
            <label className='text-xs text-grey-ternary'>JSON path</label>
            <input
                className='rounded border border-lines-light dark:border-lines-dark px-2 py-1 text-sm bg-transparent'
                value={path}
                onChange={(e) => setRepoTarget({ owner, repo, path: e.target.value })}
            />
            <Button text='Save repo settings' variant='secondary' size='small' onClick={saveRepoSettings} />

            {sessionLogin && repoList.length > 0 && (
                <div className='flex flex-col gap-1 max-h-32 overflow-auto'>
                    <span className='text-xs text-grey-ternary'>Your repos</span>
                    {repoList.map((r) => (
                        <button
                            key={r.fullName}
                            type='button'
                            className='text-left text-xs text-purple-primary hover:underline'
                            onClick={() => pickRepo(r.fullName)}
                        >
                            {r.fullName}
                        </button>
                    ))}
                </div>
            )}

            {sessionLogin && (
                <Button text='Create new repo (private)' variant='secondary' size='small' onClick={() => void createRepo()} />
            )}

            <Button
                text={isSyncing || busy ? 'Syncing…' : 'Sync now'}
                variant='primary'
                size='small'
                disabled={!sessionLogin || !owner || !repo || !path || isSyncing || busy}
                onClick={() => void manualSync()}
            />

            <Typography
                text={`Status: ${syncStatus}${hasUnsyncedChanges ? ' · unsaved changes' : ''}`}
                variant='body'
                size='small'
                className='text-grey-ternary'
            />
            {lastSyncedAt && (
                <Typography
                    text={`Last pushed: ${lastSyncedAt}`}
                    variant='body'
                    size='small'
                    className='text-grey-ternary'
                />
            )}
            {syncError && (
                <Typography text={syncError} variant='body' size='small' className='text-red-primary' />
            )}
        </div>
    )
}
