import './Loading.css'

const Loading = ({ isVisible = true }) => {
  return (
    <div
      className={`loading ${!isVisible ? 'hidden' : ''}`}
      role="status"
      aria-live="polite"
    >
      <img src='/assets/loading.gif' alt='Loading...' />
    </div>
  )
}

export default Loading