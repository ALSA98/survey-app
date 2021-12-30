import { useState, useMemo, useEffect } from 'react'
// types
import { FC } from 'react'
import { Question, QuestionMode } from '../types/question'
// components
import CreateQuestionModalOptions from './CreateQuestionModalOptions'
// ui components
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import TextField from '@mui/material/TextField'
import Collapse from '@mui/material/Collapse'
import CloseIcon from '@mui/icons-material/Close'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'

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
  data: Question
  onClose: (options: { save: boolean }) => void
}

const getModalTitle = (page: string | number) => {
  if (page === 'welcome') return 'صفحه خوش‌آمدگویی'
  if (page === 'end') return 'صفحه پایان و تشکر'
  return `صفحه ${page}`
}

const CreateQuestionModal: FC<props> = ({ isOpen, data, onClose }) => {
  const [tempData, setTempData] = useState<Partial<Question>>(data ?? {})
  const modalTitle = useMemo(() => getModalTitle(data.page), [data])

  const infoOnly = data.page === 'welcome' || data.page === 'end'
  const [isEditingOptions, setIsEditingOptions] = useState(false)

  const [mode, setMode] = useState<QuestionMode>(data.mode)

  useEffect(() => {
    setMode(data.mode)
  }, [data])

  const questionLabel = mode === QuestionMode.Info ? 'عنوان' : 'سوال'
  const descriptionLabel =
    mode === QuestionMode.Info ? 'توضیحات' : 'توضیحات بیشتر'

  const handleDataChange = (key: string, value: any) =>
    setTempData({ ...tempData, [key]: value })

  const withOptions =
    mode === QuestionMode.Checkbox || mode === QuestionMode.Radio

  const handleClose = () => {
    if (isEditingOptions) return
    onClose({ save: false })
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      keepMounted
    >
      <Card sx={style}>
        <CardHeader
          sx={{ fontWeight: 'bold' }}
          action={
            <IconButton
              disabled={isEditingOptions}
              onClick={handleClose}
              aria-label="close-modal"
            >
              <CloseIcon />
            </IconButton>
          }
          title={modalTitle}
        />
        <CardContent>
          {!infoOnly && (
            <ToggleButtonGroup
              sx={{ mb: 4 }}
              color="primary"
              value={mode}
              exclusive
              onChange={(_, newMode) => setMode(newMode)}
              disabled={isEditingOptions}
            >
              <ToggleButton value={QuestionMode.Info}>
                توضیح (بدون&nbsp;پاسخ)
              </ToggleButton>
              <ToggleButton value={QuestionMode.Text}>پرسش تشریحی</ToggleButton>
              <ToggleButton value={QuestionMode.Radio}>
                چندگزینه‌ای (یک&nbsp;پاسخ)
              </ToggleButton>
              <ToggleButton value={QuestionMode.Checkbox}>
                چندگزینه‌ای (چند&nbsp;پاسخ)
              </ToggleButton>
            </ToggleButtonGroup>
          )}

          <TextField
            sx={{ mb: 2 }}
            label={questionLabel + ' *'}
            variant="outlined"
            size="small"
            fullWidth
            onChange={(e) => handleDataChange('title', e.target.value)}
          />
          <TextField
            label={descriptionLabel}
            variant="outlined"
            size="small"
            multiline
            fullWidth
            onChange={(e) => handleDataChange('description', e.target.value)}
          />

          <Collapse in={withOptions}>
            <CreateQuestionModalOptions
              questionId={data.id}
              mode={mode}
              options={data.options || []}
              onChange={(newOptions) => handleDataChange('options', newOptions)}
              onEditingStated={() => setIsEditingOptions(true)}
              onEditingEnded={() => setIsEditingOptions(false)}
            />
          </Collapse>
        </CardContent>
        <CardActions sx={{ p: 2 }}>
          <Button
            onClick={() => onClose({ save: true })}
            variant="contained"
            size="large"
            startIcon={<SaveOutlinedIcon />}
            disableElevation
            disabled={isEditingOptions}
          >
            ذخیره
          </Button>
        </CardActions>
      </Card>
    </Modal>
  )
}

export default CreateQuestionModal
