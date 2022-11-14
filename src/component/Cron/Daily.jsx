import React, { useState } from 'react'
import { FormControlLabel, FormGroup, Radio, Stack, TextField } from '@mui/material'
import classNames from 'classnames/bind'

import ChooseTime from './components/ChooseTime'
import styles from './styles.css'
import cronMessages from './components/cronMessages'
import { useIntl } from 'react-intl'

const classes = classNames.bind(styles)

const Daily = ({ cronExpression, onChange }) => {
  const  {formatMessage} = useIntl()
  const [days, setDays] = useState(1)
  const onDayChange = e => {
    if ((e.target.value > 0 && e.target.value < 32) || e.target.value === '') {
      setDays(parseInt(e.target.value, 10))
      const val = [
        '0',
        cronExpression[1] === '*' ? '0' : cronExpression[1],
        cronExpression[2] === '*' ? '0' : cronExpression[2],
        '*',
        '*',
      ]
      if (e.target.value === '') {
        val[2] = '*'
      } else {
        val[2] = `1/${e.target.value}`
      }

      onChange(val)
    }
  }
  const changeHours = e => {
    const val = [...cronExpression]
    val[1] = `${e.target.value}`
    onChange(val)
  }
  const changeMinutes = e => {
    const val = [...cronExpression]
    val[0] = `${e.target.value}`
    onChange(val)
  }

  return (
    <Stack direction="column" spacing={2} alignItems="flex-start" justifyContent="flex-start">
      <div className={classes('Content')}>
        <FormGroup row>
          <FormControlLabel
            control={
              <Radio
                color="primary"
                value="1"
                onChange={() => {
                  onChange(['0', '0', '1/1', '*', '*'])
                }}
                checked={cronExpression[4] === '*'}
              />
            }
            label={formatMessage(cronMessages.everyDay)}
          />
          <FormControlLabel
            control={
              <Radio
                color="primary"
                value="4"
                onChange={() => {
                  onChange([cronExpression[0], cronExpression[1], '*', '*', '1-5'])
                }}
                checked={cronExpression[4] === '1-5'}
              />
            }
            label={formatMessage(cronMessages.everyWeekDay)}
          />
        </FormGroup>
      </div>
      <Stack direction="row" spacing={1} alignItems="center">
        {cronExpression[4] === '*' ? (
          <TextField
            id="outlined-number"
            label={formatMessage(cronMessages.everyDay)}
            value={days}
            onChange={onDayChange}
            type="number"
            InputLabelProps={{ disabled: cronExpression[4] !== '*', shrink: true }}
            margin="normal"
            disabled={cronExpression[4] !== '*'}
          />
        ) : null}
        <ChooseTime
          hour={cronExpression[1]}
          minute={cronExpression[0]}
          changeMinutes={changeMinutes}
          changeHours={changeHours}
        />
      </Stack>
    </Stack>
  )
}

export default Daily
