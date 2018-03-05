import React, { Component } from 'react'
import './App.css'
import './lib/components/QuarterBack.css'
import './lib/components/QuarterBackClassic.css'
import QuarterBack, { ruleAction, Select } from './lib'

class AsyncSelect extends Component {
  state = {
    loading: true,
    options: []
  }

  componentDidMount () {
    setTimeout(() => {
      this.props.handleUpdate('penguin', this.props.index)

      this.setState(prevState => {
        return {
          ...prevState,
          loading: false,
          options: [
            { label: 'Penguin', value: 'penguin' },
            { label: 'Pearson', value: 'pearson' }
          ]
        }
      })
    }, 5e2)
  }

  render () {
    if (this.state.loading) {
      return <p>Loading&hellip;</p>
    }

    const props = {
      ...this.props,
      options: this.state.options
    }

    return <Select {...props} />
  }
}

const book = {
  QB: 'Book',
  fields: [
    { id: 'title', label: 'Title', input: 'text', type: 'string' },
    { id: 'pub_year', label: 'Year Published', input: 'number', type: 'integer' },
    { id: 'pages', label: 'Number of Pages', input: 'number', type: 'integer' },
    { id: 'genre',
      label: 'Genre',
      input: 'select',
      type: 'string',
      options: [
        { label: 'Sci-Fi', value: 'scifi' },
        { label: 'Romance', value: 'romance' }
      ] },
    {
      QBComponent: AsyncSelect,
      id: 'publisher',
      label: 'Publisher',
      input: 'select',
      type: 'string'
    }
  ],
  title: 'Book Query'
}

const movieAction = {
  QB: 'Movie',
  display: 'Add movie',
  getDefaultData: function () {
    return {
      QB: this.QB,
      condition: '',
      rules: [ruleAction.getDefaultData()]
    }
  }
}
const movie = {
  QB: 'Movie',
  action: movieAction,
  fields: [
    { id: 'title', label: 'Title', input: 'text', type: 'string' },
    { id: 'rel_year', label: 'Year Released', input: 'number', type: 'integer' },
    { id: 'duration', label: 'Running time (mins)', input: 'number', type: 'integer' }
  ],
  title: 'Movie Query'
}

const types = [book, movie]

// const data = {
//   condition: 'or',
//   rules: [
//     {
//       QB: QB_RULE,
//       id: 'title',
//       operator: 'equal',
//       value: 'Where the red fern grows'
//     },
//     {
//       QB: QB_GROUP,
//       condition: 'and',
//       rules: [
//         { QB: QB_RULE, id: 'pub_year', operator: 'less', value: '1962' },
//         { QB: QB_RULE, id: 'pages', operator: 'greater', value: '200' }
//       ]
//     }
//   ]
// }

class App extends Component {
  state = {}

  handleUpdate = data => {
    this.setState(prevState => ({ ...prevState, data }))
  }

  render () {
    return (
      <div className='App'>
        <QuarterBack handleUpdate={this.handleUpdate} types={types} />
        <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
      </div>
    )
  }
}

export default App
