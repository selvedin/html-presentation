import React, { useState, useContext } from 'react'
import { AppContext } from 'data/AppContext'
import { JsonEditor as Editor } from 'jsoneditor-react';
import uuid from 'react-uuid'

import CommandsToolbar from 'components/common/CommandsToolbar';


const PresentationCreate = (props) => {
  const { presentations } = useContext(AppContext)
  let { id } = props.match.params
  const defaultPresentation = {
    id: uuid(), title: 'Default Title', slides:
      [
        {
          items:
            [
              { type: 'text', value: 'Ovo je prvi item', loadTime: 0 }
            ]
        }
      ]
  }
  const existing = presentations.filter(pr => pr.id === id)
  const [presentation, setPresentation] = useState(id && existing.length ? existing[0] : defaultPresentation)


  return (
    <div style={{ width: '80vw', height: '80vh' }}>
      <CommandsToolbar presentation={presentation} />
      <Editor
        value={presentation}
        onChange={json => setPresentation(json)}
      />
    </div>
  )
}

export default PresentationCreate
