export const ExpenseSchema = {
  expenseId: 'string',
  shopId: 'string',
  type: 'string',     
  amount: 'number',
  month: 'string',     
  note: 'string',
  createdAt: 'ISO string'
}

export const EXPENSE_TYPES = ['Rent', 'Electricity', 'Salary', 'Maintenance', 'Marketing', 'Other']

export const validateExpense = (data) => {
  if (!data.type) return { valid: false, error: 'Expense type required' }
  if (!data.amount || data.amount <= 0) return { valid: false, error: 'Valid amount required' }
  if (!data.month) return { valid: false, error: 'Month required' }
  return { valid: true }
}
