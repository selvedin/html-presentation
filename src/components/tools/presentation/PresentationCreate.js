import React, { useEffect, useState, useContext } from 'react'
import { AppContext } from 'data/AppContext'
import { JsonEditor as Editor } from 'jsoneditor-react';
import uuid from 'react-uuid'
import CommandsToolbar from 'components/common/CommandsToolbar';

const PresentationCreate = (props) => {
  const { presents } = useContext(AppContext)
  let present = { id: uuid(), title: 'Edit title', slides: [] }
  const [presentation, setPresentation] = useState(present)

  const { id } = props.match.params
  if (id) {
    const existing = presents.find(pr => id === pr.id)
    if (existing) {
      present = { ...existing }
    }
  }
  useEffect(() => {
    setPresentation(present)
  }, [])

  const handleChange = (json) => {
    setPresentation({ ...json })
  }

  return (
    <div style={{ width: '80vw', height: '80vh' }}>
      <CommandsToolbar appTitle={present.title} data={presentation} />
      <Editor
        value={present}
        onChange={json => handleChange(json)}
      />
    </div>
  )
}

export default PresentationCreate
