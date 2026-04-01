import Input from '../ui/Input'
import { RiSearchLine } from 'react-icons/ri'

export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <Input
      placeholder={placeholder}
      icon={<RiSearchLine className="w-4 h-4" />}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  )
}