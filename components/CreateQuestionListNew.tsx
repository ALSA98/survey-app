// types
import { FC } from 'react'
// ui components
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

type props = {
  onClick: () => void
}

const CreateQuestionListNew: FC<props> = ({ onClick }) => {
  return (
    <Button
      variant="outlined"
      size="large"
      fullWidth
      startIcon={<AddIcon />}
      sx={{ border: '2px dashed rgba(0,0,0,0.1)', height: '52px', mb: 2 }}
      onClick={() => onClick()}
    >
      افزودن پرسش
    </Button>
  )
}

export default CreateQuestionListNew
