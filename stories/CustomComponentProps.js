import React from 'react'
import _ from 'lodash'
import namor from 'namor'

import CodeHighlight from './components/codeHighlight'
import ReactTable from '../src/index'

export default () => {
  const data = _.map(_.range(5553), d => {
    return {
      firstName: namor.generate({ words: 1, numLen: 0 }),
      lastName: namor.generate({ words: 1, numLen: 0 }),
      age: Math.floor(Math.random() * 30)
    }
  })

  const columns = [{
    Header: 'Name',
    columns: [{
      Header: 'First Name',
      accessor: 'firstName'
    }, {
      Header: 'Last Name',
      id: 'lastName',
      accessor: d => d.lastName
    }]
  }, {
    Header: 'Info',
    columns: [{
      Header: 'Age',
      accessor: 'age'
    }]
  }]

  return (
    <div>
      <strong>Hey!</strong> Open your console! :)
      <div className='table-wrap'>
        <ReactTable
          className='-striped -highlight'
          data={data}
          columns={columns}
          defaultPageSize={10}
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onMouseEnter: e => console.log('Cell - onMouseEnter', {
                state,
                rowInfo,
                column,
                instance,
                event: e
              })
            }
          }}
        />
      </div>
      <div style={{textAlign: 'center'}}>
        <br />
        <em>Tip: Hold shift when sorting to multi-sort!</em>
      </div>
      <CodeHighlight>{() => getCode()}</CodeHighlight>
    </div>
  )
}

function getCode () {
  return `
const columns = [{
  Header: 'Name',
  columns: [{
    Header: 'First Name',
    accessor: 'firstName'
  }, {
    Header: 'Last Name',
    id: 'lastName',
    accessor: d => d.lastName
  }]
}, {
  Header: 'Info',
  columns: [{
    Header: 'Age',
    accessor: 'age'
  }]
}]

return (
  <ReactTable
    className='-striped -highlight'
    data={data}
    columns={columns}
    defaultPageSize={10}
    getTdProps={(state, rowInfo, column, instance) => {
      return {
        onMouseEnter: e => console.log('Cell - onMouseEnter', {
          state,
          rowInfo,
          column,
          instance,
          event: e
        })
      }
    }}
  />
)
  `
}
