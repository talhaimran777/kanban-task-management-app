import BoardInfo from 'others/board/board-info'

export default function Home() {
  return (
    <div className='flex justify-center items-start flex-1 bg-grey-primary dark:bg-very-dark-grey md:max-w-[calc(100vw-261px)]'>
      <BoardInfo />
    </div>
  )
}
