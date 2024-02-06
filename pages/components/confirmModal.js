import CButton from './cbutton'
const ConfirmModal = ({ text, canceltext, confirmtext, onCancel, onConfirm }) => {
  const stopClick = (event) => {
    event.stopPropagation()
  }
  return (
    <div>
      <div className="pointer-events-none fixed inset-0 bg-primary-500 transition-opacity"></div>

      <div className="pointer-events-auto absolute inset-0 overflow-hidden">
        <div
          onClick={stopClick}
          className="fixed left-1/2 top-1/2  w-72 max-w-full -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-secondary px-4 py-6 text-center "
        >
          <p className="mb-4 text-2xl font-bold">{text}</p>
          <div className=" flex justify-between gap-4">
            <CButton className="w-full" text={canceltext} mode={'secondary'} size={'sm'} click={onCancel}></CButton>
            <CButton className="w-full" text={confirmtext} mode={'primary'} size={'sm'} click={onConfirm}></CButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
