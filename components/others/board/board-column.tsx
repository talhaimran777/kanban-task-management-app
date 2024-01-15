import Typography from 'custom/typography'
import { Column } from 'types/mock/v2'

const BoardColumn = ({ column }: { column: Column }) => {
    return (
        <div className='min-w-[280px] my-6 flex flex-col gap-6'>
            <Typography
                // text={`${column.name} ${
                //     column.tasks?.length ? `(${column.tasks.length})` : '(0)'
                // }`}
                text={`${column.name}`}
                size='small'
                variant='heading'
                className='text-grey-ternary tracking-widest uppercase'
            />
        </div>
    )
}

export default BoardColumn
