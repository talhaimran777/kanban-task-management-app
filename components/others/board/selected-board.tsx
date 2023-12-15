'use client'

import { DialogTrigger } from '@radix-ui/react-dialog'
import MobileMenuDialog from 'custom/dialog/mobile-menu-dialog'
import Typography from 'custom/typography'
import ChevronDownIcon from 'images/icon-chevron-down.svg'
import Image from 'next/image'
import useDataStore from 'store/data'

const SelectedBoard = () => {
  const { boards, currentBoard } = useDataStore((state) => state.data)

  return (
    <MobileMenuDialog
      trigger={
        <DialogTrigger>
          <div className='flex justify-between items-center gap-2'>
            <Typography text={currentBoard} size='large' variant='heading' />
            <Image
              src={ChevronDownIcon}
              alt='ChevronDownIcon'
              height={12}
              width={12}
            />
          </div>
        </DialogTrigger>
      }
      boards={boards}
    />
  )
}

export default SelectedBoard
