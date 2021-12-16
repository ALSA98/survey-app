// types
import { FC } from 'react'
import { QuestionMode } from '../types/question'
// ui components
import { Button } from '@mui/material'

type props = {
  name: string
  mode: QuestionMode
  onClick: () => void
}

const CreateQuestionListItem: FC<props> = ({ name, mode, onClick }) => {
  return (
    <Button
      variant="outlined"
      disableElevation
      size="large"
      fullWidth
      sx={{ border: '1px solid rgba(0,0,0,0.1)', height: '52px', mb: 2 }}
      onClick={() => onClick()}
    >
      {name}
    </Button>
  )
}

export default CreateQuestionListItem
