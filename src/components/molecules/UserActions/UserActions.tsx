import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import React from 'react'

interface IAction {
  name: string
  icon: React.ReactNode
  onClick: () => void
}

interface IUserActionsProps {
  actions: IAction[]
}

const UserActions = ({ actions }: IUserActionsProps) => (
  <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1 }}>
    <SpeedDial ariaLabel="Ações" icon={<SpeedDialIcon />}>
      {actions.map(action => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.onClick}
        />
      ))}
    </SpeedDial>
  </Box>
)

export default UserActions
