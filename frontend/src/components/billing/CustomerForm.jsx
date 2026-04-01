import Input from '../ui/Input'

export default function CustomerForm({ name, phone, onNameChange, onPhoneChange }) {
  return (
    <div className="space-y-4">
      <Input
        label="Customer Name"
        value={name}
        onChange={e => onNameChange(e.target.value)}
        placeholder="Rahul Sharma"
        required
      />
      <Input
        label="Customer Phone"
        type="tel"
        value={phone}
        onChange={e => onPhoneChange(e.target.value)}
        placeholder="9876543210"
        required
      />
    </div>
  )
}