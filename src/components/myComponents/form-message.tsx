import { IoIosWarning } from 'react-icons/io'
import { CiCircleCheck } from "react-icons/ci";
import { cn } from '@/lib/utils';

interface Props {
  message ?: string | null;
  className ?: string | null;
}

export const FormError = ({
  message , className
}: Props) => {
  if(!message) return null;
  return (
    <div className={cn("bg-error/10 border-l-2 px-1 py-2 border-error" , className )}>
      <div className='flex text-rose-600  text-sm gap-3'>
        <IoIosWarning size={20}/>
        <span>{message}</span>
      </div>
    </div>
  )
}

export const FormSuccess = ({
  message , className 
}: Props) => {
  if(!message) return null;
  return (
    <div className={cn("flex text-success bg-success/10 text-sm gap-3 border-l-2 px-1 py-2 border-success" , className)}>
      <CiCircleCheck size={20}/>
      <span>{message}</span>
    </div>
  )
}
