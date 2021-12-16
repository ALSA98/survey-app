import { useState, useEffect } from 'react'
// types
import { FC } from 'react'
import { Question, QuestionMode } from '../types/question'
// ui components
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import CloseIcon from '@mui/icons-material/Close'

import TextField from '@mui/material/TextField'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  maxWidth: 'calc(100vw - 32px)',
  boxShadow: 24,
  p: 1,
}

type props = {
  isOpen: boolean
  isNew: boolean
  data: Question | null
  onClose: (options: { save: boolean }) => void
}

const CreateQuestionModal: FC<props> = ({ isOpen, isNew, data, onClose }) => {
  const [tempData, setTempData] = useState<Partial<Question>>({})
  const titleLabel = data?.mode === QuestionMode.Info ? 'عنوان' : 'سوال'

  return (
    <Modal
      open={isOpen}
      onClose={() => onClose({ save: false })}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      keepMounted
    >
      <Card sx={style}>
        <CardHeader
          sx={{ fontWeight: 'bold' }}
          action={
            <IconButton
              onClick={() => onClose({ save: false })}
              aria-label="close-modal"
            >
              <CloseIcon />
            </IconButton>
          }
          title={!isNew ? data?.title : 'پرسش جدید'}
        />
        <CardContent>
          <TextField
            label={titleLabel}
            variant="outlined"
            size="small"
            fullWidth
          />
        </CardContent>
        <CardActions sx={{ p: 2 }}>
          <Button
            onClick={() => onClose({ save: true })}
            variant="contained"
            disableElevation
          >
            ذخیره
          </Button>
        </CardActions>
      </Card>
    </Modal>
  )
}

export default CreateQuestionModal
