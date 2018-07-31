import * as React from 'react'
import { inject, observer } from 'mobx-react'
import * as _ from 'lodash'
import RootStore from '@app/models/RootStore'
import { translate } from '@app/utils'
import constants from '@app/constants'

const XAxis = ({ xScale, yScale, rootStore }: {
  xScale: any,
  yScale: any,
  rootStore?: RootStore,
}) => (
  <g className='axis x-axis'>
    {
      _.times(rootStore.numTimePeriods / 12, i => (
        <g key={i} className='tick x-tick'
          transform={translate(xScale(i * 12), yScale.range()[1])}>
          <text dx='6' dy='-6' x='0' y='0'>{constants.START_YEAR + i}</text>
          <line x1='0.5' y1={1 + yScale.range()[0] - yScale.range()[1]}
            x2='0' y2='-5' />
        </g>
      ))
    }
  </g>
)

export default inject('rootStore')(observer(XAxis))
