import Typography from 'custom/typography'
import BoardColumn from 'others/board/board-column'
import { Column } from 'types/mock'

const BoardColumns = ({ columns }: { columns: Column[] }) => {
  return (
    <div className='flex gap-6 max-h-[calc(100vh-72px)] h-full w-full px-6 overflow-auto'>
      {columns.map((column) => (
        <BoardColumn column={column} />
      ))}
      <div className='flex justify-center items-center min-w-[280px] dark:bg-dark-grey bg-[#EAF0FA] my-6'>
        <div
          onClick={() => console.log('Create a new column')}
          className='cursor-pointer'
        >
          <Typography text='+ new column' size='large' variant='heading' />
        </div>
      </div>
    </div>
  )
}

export default BoardColumns
