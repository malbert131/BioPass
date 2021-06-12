import { FC, useState, useEffect } from 'react';

const Timer: FC = () => {

  const [counter, setCounter] = useState(25)

  useEffect(() => {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);


  return (
    <div className="App">
      {counter === 0 ? <div>Done!</div> :  <div>0:{counter}</div>}
     
    </div>
  )
}

export default Timer