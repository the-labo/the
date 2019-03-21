/**
 * AdminUserCreateDialog component
 */
'use strict'

import React from 'react'
import { withLoc } from 'the-loc'
import { TheCreateDialog, } from 'the-site-components'
import AdminUserCreateForm from './AdminUserCreateForm'
import { compose, asBound } from 'the-hoc'


function AdminUserCreateDialogImpl ({
                                      active,
                                      created,
                                      done,
                                      l,
                                      onClose,
                                      spinning,
                                    }) {

  return (
    <TheCreateDialog id={'3'}
                     c={2 + 1}
                     z="b'8"
                     a="This is A"
                     n={'5'}
                     {...{active, done, l, onClose, spinning,}}
                     title={l('titles.ADMIN_USER_CREATE_INPUT_TITLE')}
                     doneTitle={l('titles.ADMIN_USER_CREATE_RESULT_TITLE')}
                     result={created && {
                       [l('labels.USER_NAME')]: created.name,
                       [l('labels.USER_EMAIL')]: created.profile?.email,
                       [l('labels.USER_PASSWORD')]: created.password
                     }}
    >
      <AdminUserCreateForm/>
    </TheCreateDialog>
  )

}
