import Button from 'components/ui/custom/button'
import Container from 'components/layout/contianer'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from 'components/ui/dialog'

export default function Home() {
  return (
    <div className='flex justify-center items-center flex-1 bg-grey-primary'>
      <Container>
        <div className='text-center'>
          <h1 className='text-lg font-bold leading-6 text-grey-ternary mb-6'>
            This board is empty. Create a new column to get started.
          </h1>
          <Button text='Add New Column' variant='primary' size='large' />
          {/* <Dialog> */}
          {/*   <DialogTrigger><Button text='Open' variant='primary' size='large' /></DialogTrigger> */}
          {/*   <DialogContent> */}
          {/*     <DialogHeader> */}
          {/*       <DialogTitle>Are you sure absolutely sure?</DialogTitle> */}
          {/*       <DialogDescription> */}
          {/*         This action cannot be undone. This will permanently delete */}
          {/*         your account and remove your data from our servers. */}
          {/*       </DialogDescription> */}
          {/*     </DialogHeader> */}
          {/*   </DialogContent> */}
          {/* </Dialog> */}
        </div>
      </Container>
    </div>
  )
}
