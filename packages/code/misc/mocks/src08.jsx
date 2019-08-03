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
      active={active}
      c={3}
      done={done}
      doneTitle={l('titles.ADMIN_USER_CREATE_RESULT_TITLE')}
      id={'3'}
      l={l}
      n={'5'}
      onClose={onClose}
      result={
        created && {
          [l('labels.USER_EMAIL')]: created.profile?.email,
          [l('labels.USER_NAME')]: created.name,
          [l('labels.USER_PASSWORD')]: created.password,
        }
      }
      spinning={spinning}
      title={l('titles.ADMIN_USER_CREATE_INPUT_TITLE')}
      z="b'8"
    >
      <AdminUserCreateForm />
    </TheCreateDialog>
  )
}
