import { Icon } from './Icons.jsx'
import { exportRows } from '../util.js'

// Export the given rows to a spreadsheet (CSV / Excel).
// props: rows, filename, columns (optional [{key,label,value?}]), label
export default function ExportButton({ rows, filename = 'export.csv', columns, label = 'Export' }) {
  return (
    <button className="btn btn-ghost" onClick={() => exportRows(rows, filename, columns)} title="Export to Excel">
      <Icon name="download" size={16} /> {label}
    </button>
  )
}
