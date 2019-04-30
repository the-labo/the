/**
 * AdminUserCreateDialog component
 */
'use strict'

import React from 'react'
import { TheCreateDialog } from 'the-site-components'
import AdminUserCreateForm from './AdminUserCreateForm'

function AdminUserCreateDialogImpl({
  active,
  created,
  done,
  l,
  onClose,
  spinning,
}) {
  return (
    <TheCreateDialog
      a='This is A'
      c={2 + 1}
      id={'3'}
      n={'5'}
      z="b'8"
      {...{ active, done, l, onClose, spinning }}
      doneTitle={l('titles.ADMIN_USER_CREATE_RESULT_TITLE')}
      result={
        created && {
          [l('labels.USER_NAME')]: created.name,
          [l('labels.USER_EMAIL')]: created.profile?.email,
          [l('labels.USER_PASSWORD')]: created.password,
        }
      }
      title={l('titles.ADMIN_USER_CREATE_INPUT_TITLE')}
    >
      <AdminUserCreateForm />
    </TheCreateDialog>
  )
}
