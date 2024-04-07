import Image from 'next/image'

const TaskImages = ({ images }: { images: string[] }) => {
    if (images.length < 1) {
        return null
    }

    return (
        <div className='grid gap-6'>
            {images.map((image, index) => (
                <Image
                    key={index}
                    src={image}
                    width={100}
                    height={100}
                    alt='image'
                    className='w-full h-auto rounded-md shadow-md'
                />
            ))}
        </div>
    )
}

export default TaskImages
