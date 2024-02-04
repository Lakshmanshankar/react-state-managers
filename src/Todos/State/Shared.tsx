//ignore this
import { Button } from '@/components/ui/button';
import { useState } from 'react'

export default function Shared() {
  return (
    <div>
        <RenderButton render={1}/>
        <RenderButton render={2}/>
    </div>
  )
}

 function RenderButton({render}:{render:number}) {
  console.log('RenderButton',render)
  const [counter,setCounter] = useState(0);
  return (
    <div className='flex p-1 justify-center'>
        <h1 className='text-2xl font-extrabold'>{render} Button</h1>
        <h2 className=' px-3 text-center '>{counter}</h2>
        <Button onClick={()=>setCounter(counter+1)}> Increment</Button>
    </div>
  )
}
