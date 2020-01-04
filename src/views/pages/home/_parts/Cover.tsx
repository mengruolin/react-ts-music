import * as React from 'react';

interface Props {
  url: string;
}

const Cover: React.FC<Props> = (props: Props) => {
  React.useEffect(() => {
    console.log(props.url);
  })

  return(
    <>
    </>
  )
}

export default Cover
