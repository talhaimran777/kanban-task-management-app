import { createMeta } from 'src/lib/domain/meta'
import type { Column } from 'src/types/mock'
import { v4 as uuidv4 } from 'uuid'

export default function createColumnEntity(name: string, boardId: string, clientId?: string): Column {
    const meta = createMeta(clientId)
    return {
        id: uuidv4(),
        name,
        boardId,
        ...meta,
    }
}
