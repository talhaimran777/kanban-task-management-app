import Button from 'ui/custom/button'
import Container from 'layout/contianer'

export default function Home() {
  return (
    <div className='flex justify-center items-center flex-1 bg-grey-primary dark:bg-very-dark-grey'>
      <Container>
        <div className='text-center'>
          <h1 className='text-lg font-bold leading-6 text-grey-ternary mb-6'>
            This board is empty. Create a new column to get started.
          </h1>
          <Button text='Add New Column' variant='primary' size='large' />
        </div>
      </Container>
    </div>
  )
}
