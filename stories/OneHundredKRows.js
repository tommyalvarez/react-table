import React from 'react'
import _ from 'lodash'
import namor from 'namor'

import CodeHighlight from './components/codeHighlight'
import ReactTable from '../src/index'

export default () => {
  const data = _.map(_.range(100000), d => {
    return {
      firstName: namor.generate({ words: 1, numLen: 0 }),
      lastName: namor.generate({ words: 1, numLen: 0 }),
      age: Math.floor(Math.random() * 30),
      visits: Math.floor(Math.random() * 100)
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
      accessor: 'age',
      aggregate: vals => _.round(_.mean(vals)),
      Aggregated: row => {
        return <span>{row.value} (avg)</span>
      }
    }, {
      Header: 'Visits',
      accessor: 'visits',
      aggregate: vals => _.sum(vals)
    }]
  }]

  return (
    <div>
      <div className='table-wrap'>
        <ReactTable
          data={data}
          columns={columns}
          className='-striped -highlight'
          defaultPageSize={10}
          pivotBy={['firstName', 'lastName']}
          SubComponent={(row) => {
            return (
              <div style={{padding: '20px'}}>
                <em>You can put any component you want here, even another React Table!</em>
                <br />
                <br />
                <ReactTable
                  data={data}
                  columns={columns}
                  defaultPageSize={3}
                  showPagination={false}
                  SubComponent={(row) => {
                    return (
                      <div style={{padding: '20px'}}>
                        <em>It even has access to the row data: </em>
                        <CodeHighlight>{() => JSON.stringify(row, null, 2)}</CodeHighlight>
                      </div>
                    )
                  }}
                />
              </div>
            )
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
    accessor: 'age',
    aggregate: vals => _.round(_.mean(vals)),
    Cell: row => {
      return <span>{row.aggregated ? \`\${row.value} (avg)\` : row.value}</span>
    }
  }, {
    Header: 'Visits',
    accessor: 'visits',
    aggregate: vals => _.sum(vals)
  }]
}]

return (
  <ReactTable
    data={data}
    columns={columns}
    defaultPageSize={10}
    className='-striped -highlight'
    pivotBy={['firstName', 'lastName']}
    SubComponent={(row) => {
      return (
        <div style={{padding: '20px'}}>
          <em>You can put any component you want here, even another React Table!</em>
          <br />
          <br />
          <ReactTable
            data={data}
            columns={columns}
            defaultPageSize={3}
            showPagination={false}
            SubComponent={(row) => {
              return (
                <div style={{padding: '20px'}}>
                  <em>It even has access to the row data: </em>
                  <CodeHighlight>{() => JSON.stringify(row, null, 2)}</CodeHighlight>
                </div>
              )
            }}
          />
        </div>
      )
    }}
  />
)
  `
}
