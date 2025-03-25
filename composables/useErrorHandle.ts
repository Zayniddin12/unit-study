import type { ErrorResponse } from '~/types'

const useErrorHandle = () => {
  const { showToast } = useCustomToast()

  return (error: ErrorResponse) => {
    if (error?._data?.detail?.message) {
      showToast(error._data.detail.message, 'error')
    }
  }
}

export default useErrorHandle
