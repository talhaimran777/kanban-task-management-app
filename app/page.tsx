import Button from 'ui/custom/button'
import Container from 'layout/contianer'
import Typography from 'custom/typography'

export default function Home() {
  return (
    <div className='flex justify-center items-center flex-1 bg-grey-primary dark:bg-very-dark-grey'>
      <Container>
        <div className='text-center'>
          <Typography
            text='This board is empty. Create a new column to get started.'
            variant='heading'
            size='large'
            className='mb-6 text-grey-ternary'
          />
          <Button text='Add New Column' variant='primary' size='large' />
        </div>
      </Container>
    </div>
  )
}
