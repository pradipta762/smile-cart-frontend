import { Tooltip } from 'neetoui'
import React from 'react'

const TooltipWrapper = ({ showTooltip, children, ...tooltipProps }) => {
  if(!showTooltip) return children;

  return (
    <Tooltip {...tooltipProps} >
      <div>{children}</div>
    </Tooltip>
  )
}

export default TooltipWrapper