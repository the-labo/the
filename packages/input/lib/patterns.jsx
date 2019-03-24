'use strict'

import regexEmail from 'regex-email'
import regexUrl from 'regex-url'

export const URL_PATTERN = regexUrl
export const EMAIL_PATTERN = regexEmail

export default {
  EMAIL_PATTERN,
  URL_PATTERN,
}
