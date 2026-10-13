import { engagements } from "../content/engagements"
export default function EngagementField({
  id,
  value,
  onChange,
}: {
  id: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div>
      <label className="field-label" htmlFor={id}>
        How would you like to work with us?{" "}
        <span className="field-optional">optional</span>
      </label>
      <select
        id={id}
        name="engagement"
        className="field-input"
        aria-describedby={value ? `${id}-hint` : undefined}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Help me decide</option>
        {engagements.map((item) => (
          <option key={item.id} value={item.id}>
            {item.title}
          </option>
        ))}
      </select>
      {value && (
        <p id={`${id}-hint`} className="engagement-form-hint">
          Your option is selected, with a suggested service and a draft message
          below. You can change any of them before sending.
        </p>
      )}
    </div>
  )
}
