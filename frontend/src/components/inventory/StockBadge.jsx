import Badge from '../ui/Badge'

export default function StockBadge({ quantity, threshold = 5 }) {
  if (quantity === 0) return <Badge variant="danger">Out of Stock</Badge>
  if (quantity <= threshold) return <Badge variant="warning">Low Stock</Badge>
  return <Badge variant="success">In Stock</Badge>
}