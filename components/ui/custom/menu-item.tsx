import { ReactNode } from 'react'

const MenuItem = ({
  icon,
  typography,
}: {
  icon: ReactNode
  typography: ReactNode
}) => {
  return (
    <>
      {icon}
      {typography}
    </>
  )
}

export default MenuItem
