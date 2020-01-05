import * as React from 'react'
import '../_styles/cover.scss'

interface Props {
  url: string;
}

const Cover: React.FC<Props> = (props: Props) => {
  React.useEffect(() => {
    console.log(props.url);
  })

  return(
    <div className="_cover x-y-center">

    </div>
  )
}

export default Cover
