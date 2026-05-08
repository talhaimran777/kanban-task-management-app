import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface GitHubRepoSettings {
    owner: string
    repo: string
    path: string
    setRepoTarget: (o: { owner: string; repo: string; path: string }) => void
    clear: () => void
}

const defaultPath = 'kanban-sync.json'

const useGitHubRepoSettings = create<GitHubRepoSettings>()(
    persist(
        (set) => ({
            owner: '',
            repo: '',
            path: defaultPath,
            setRepoTarget: ({ owner, repo, path }) =>
                set({ owner, repo, path: path || defaultPath }),
            clear: () => set({ owner: '', repo: '', path: defaultPath }),
        }),
        { name: 'kanban-github-repo', version: 1 }
    )
)

export default useGitHubRepoSettings
