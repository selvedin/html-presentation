import LargeButton from 'components/common/LargeButton'
import React, { useContext } from 'react'
import { AppContext } from 'data/AppContext'

const Dashboard = () => {
  const { presentations } = useContext(AppContext)

  return (
    <div>

      <LargeButton label="add_circle" isIcon={true} titleLabel="Add new presentation" path={'/presentation/' + null} />
      {
        presentations.map(pr => <LargeButton key={pr.id} label={pr.title} isIcon={false} titleLabel={pr.title} path={'/presentation/' + pr.id} />)
      }
    </div>
  )
}

export default Dashboard
