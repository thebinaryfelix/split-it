import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/core'
import React from 'react'

interface IAction {
  name: string
  icon: React.ReactNode
  onClick: () => void
}

interface IUserActionsProps {
  actions: IAction[]
}

const UserActions = ({ actions }: IUserActionsProps) => {
  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="Ações"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
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
}

export default UserActions
