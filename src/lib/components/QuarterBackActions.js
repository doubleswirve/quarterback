// @flow
import * as React from 'react'
import type { Action } from '../utils/Action'
import type { Data } from '../utils/Data'
import type { Field } from '../utils/Field'
import type { StyleClassMap } from './StyleClassMap'
import type { Type } from '../utils/Type'
import { ruleAction, groupAction, getActionByType } from '../utils/actions'
import QuarterBackActionCreate from './QuarterBackActionCreate'
import QuarterBackActionDelete from './QuarterBackActionDelete'

type Props = {
  fields: Array<Field>,
  index: number,
  styleClassMap: StyleClassMap,
  types: Array<Type>,
  handleCreate: (data: Data) => void,
  handleDelete: (index: number) => void
}

class QuarterBackActions extends React.Component<Props> {
  static defaultProps = {
    fields: [],
    types: []
  }

  getActions (): Array<Action> {
    const {
      fields,
      types
    } = this.props

    if (fields.length > 0) {
      return [ruleAction, groupAction]
    }

    const actions = types.map(getActionByType)

    if (actions.length < 1) {
      return []
    }

    return [...actions, groupAction]
  }

  render () {
    const {
      fields,
      index,
      styleClassMap,
      types,
      handleCreate,
      handleDelete
    } = this.props

    const addClass = styleClassMap.QuarterBackActions != null
      ? styleClassMap.QuarterBackActions
      : ''

    return (
      <div className={`QuarterBackActions ${addClass}`}>
        {this.getActions().map((action, index) => {
          return (
            <QuarterBackActionCreate
              key={index}
              action={action}
              fields={fields}
              styleClassMap={styleClassMap}
              types={types}
              handleCreate={handleCreate}
            />
          )
        })}
        <QuarterBackActionDelete
          index={index}
          styleClassMap={styleClassMap}
          handleDelete={handleDelete}
        />
      </div>
    )
  }
}

export default QuarterBackActions
