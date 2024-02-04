import { ModeToggle } from './ThemeToggle'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export const PageLinks = () => {
  return (
    <div>
      <div className="Layout">
        <ul className=" dark:text-white w-full flex justify-evenly">
          <li>
            <ModeToggle />
          </li>
          <li className="w-full">
            <Button variant='outline'><Link to="/state">State</Link></Button>
          </li>
          <li className="w-full">
            <Button variant='outline'><Link to="/context">Context</Link></Button>
          </li>
          <li className="w-full">
            <Button variant='outline'><Link to="/reducer">Reducer</Link></Button>
          </li>
          <li className="w-full">
            <Button variant='outline'><Link to="/zustand">Zustand</Link></Button>
          </li>
          <li className="w-full">
            <Button variant='outline'><Link to="/jotai">Jotai</Link></Button>
          </li>
        </ul>
      </div>
    </div>
  )
}
