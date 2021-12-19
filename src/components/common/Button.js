export default function Button({ text }) {
  return (
    <div>
      <button type="click" className="user-form submit-button">
        {text}
      </button>
    </div>
  )
}