import Image from 'next/image'

const TaskImages = ({ images }: { images: string[] }) => {
    if (images.length < 1) {
        return null
    }

    return images.map((image, index) => (
        <Image
            key={index}
            src={image}
            width={100}
            height={100}
            alt='image'
            className='w-full h-auto rounded-md shadow-md'
        />
    ))
}

export default TaskImages
