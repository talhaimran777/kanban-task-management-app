import BoardIcon from 'assets/svg-icons/BoardIcon'
import MenuItem from 'custom/menu-item'

const CreateBoardMenuItem = () => {
  return (
    <div className='mr-6 px-6 flex items-center py-[14px] gap-3 rounded-r-full transition text-purple-primary hover:bg-[#EFEFF9] dark:hover:bg-white cursor-pointer'>
      <MenuItem
        icon={<BoardIcon />}
        typography={
          <h1 className='text-md font-bold leading-6'>+ Create New Board</h1>
        }
      />
    </div>
  )
}

export default CreateBoardMenuItem
