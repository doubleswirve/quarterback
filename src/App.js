import React, { Component } from 'react'
import './App.css'
import './lib/components/QuarterBack.css'
import './lib/components/QuarterBackClassic.css'
import QuarterBack, { QB_RULE, QB_GROUP } from './lib'

const fields = [
  { id: 'title', label: 'Title', input: 'text', type: 'string' },
  { id: 'pub_year', label: 'Year Published', input: 'number', type: 'integer' },
  { id: 'pages', label: 'Number of Pages', input: 'number', type: 'integer' }
]

const data = {
  condition: 'or',
  rules: [
    {
      QB: QB_RULE,
      id: 'title',
      operator: 'equal',
      value: 'Where the red fern grows'
    },
    {
      QB: QB_GROUP,
      condition: 'and',
      rules: [
        { QB: QB_RULE, id: 'pub_year', operator: 'less', value: '1962' },
        { QB: QB_RULE, id: 'pages', operator: 'greater', value: '200' }
      ]
    }
  ]
}

class App extends Component {
  state = {
    data
  }

  handleUpdate = data => {
    this.setState(prevState => ({ ...prevState, data }))
  }

  render () {
    return (
      <div className='App'>
        <QuarterBack fields={fields} handleUpdate={this.handleUpdate} rules={data} />
        <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
      </div>
    )
  }
}

export default App
