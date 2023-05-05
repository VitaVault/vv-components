/* eslint-disable @typescript-eslint/no-empty-function */
import { FormEvent, SyntheticEvent, useState } from 'react'

export type formSubmitCallback = (
  e: FormEvent<HTMLFormElement>,
  fields?: Record<string, string | File>
) => void | Promise<void>

export function useFormValidation(nativeReportValidity = true) {
  const [formError, setFormError] = useState<boolean>(false)

  /**
   * Will validate form and send values to callback or trigger native validation,
   * will also blur inputs to use native validation
   * @param evt represents the Submitevent that is triggered by the form
   * @param callback function that will receive the submit event and the form data if valid
   */
  const submitHandler = (
    evt: SyntheticEvent<HTMLFormElement>,
    callback: formSubmitCallback = () => {}
  ) => {
    evt.preventDefault()
    const results: Record<string, string | File> = {}
    const fdata = new FormData(evt.target as HTMLFormElement)
    for (const [key, value] of fdata.entries()) {
      results[key] = value
    }

    if (evt.currentTarget.checkValidity()) {
      callback(evt, results)
    } else {
      Object.keys(results).forEach((key) => {
        const fieldElement = document.getElementById(key)
        fieldElement?.focus()
        fieldElement?.blur()
      })
      if (nativeReportValidity) evt.currentTarget.reportValidity()
    }
  }

  return {
    formError,
    setFormError,
    submitHandler
  }
}
