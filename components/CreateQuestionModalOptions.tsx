import { FC, useState, useEffect } from 'react'
// types
import { QuestionMode, QuestionOption } from '../types/question'
// ui components
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Checkbox from '@mui/material/Checkbox'
import Radio from '@mui/material/Radio'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import AddIcon from '@mui/icons-material/Add'
import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Collapse from '@mui/material/Collapse'
import { TransitionGroup } from 'react-transition-group'
// utils
import generateUniqueId from '../utils/id-generator'

type props = {
  questionId: string
  options: QuestionOption[]
  mode: QuestionMode
  onChange: (options: QuestionOption[]) => void
  onEditingStated: () => void
  onEditingEnded: () => void
}

const CreateQuestionModalOptions: FC<props> = ({
  questionId,
  options,
  mode,
  onChange,
  onEditingStated,
  onEditingEnded,
}) => {
  const [tempOptions, setTempOptions] = useState<QuestionOption[]>(
    options ?? []
  )
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [editingOptionId, setEditingOptionId] = useState<string | null>(null)
  const [addingOptionId, setAddingOptionId] = useState<string | null>(null)
  const [editingOptionText, setEditingOptionText] = useState<string>('')

  useEffect(() => {
    if (isEditMode) onEditingStated()
    else onEditingEnded()
  }, [isEditMode, onEditingStated, onEditingEnded])

  const addTempOption = () => {
    setEditingOptionText('')
    setIsEditMode(true)
    const newQuestionId = `${questionId}-${generateUniqueId(3)}`
    setTempOptions([...tempOptions, { id: newQuestionId, text: '' }])
    setAddingOptionId(newQuestionId)
  }

  const cancelEditingOption = (id: string) => {
    if (addingOptionId === id) {
      tempOptions.pop()
      setTempOptions(tempOptions)
    } else {
      setEditingOptionId(null)
    }
    setIsEditMode(false)
  }

  const editOption = (id: string) => {
    const index = tempOptions.findIndex((opt: QuestionOption) => opt.id === id)
    setEditingOptionText(tempOptions[index].text)
    setEditingOptionId(id)
    setIsEditMode(true)
  }

  const submitOption = (id: string) => {
    const index = tempOptions.findIndex((opt: QuestionOption) => opt.id === id)
    tempOptions[index].text = editingOptionText
    setTempOptions(tempOptions)
    setEditingOptionId(null)
    setAddingOptionId(null)
    setIsEditMode(false)
  }

  const deleteOption = (id: string) => {
    setTempOptions(tempOptions.filter((opt: QuestionOption) => opt.id !== id))
    setEditingOptionId(null)
    setIsEditMode(false)
  }

  const getEditingOptionJSX = (opt: QuestionOption) => (
    <>
      <TextField
        sx={{ mr: 1 }}
        variant="outlined"
        size="small"
        placeholder="گزینه جدید"
        value={editingOptionText}
        onChange={(e) => setEditingOptionText(e.target.value)}
        autoFocus
      />
      <IconButton
        color="success"
        disabled={!editingOptionText}
        onClick={() => submitOption(opt.id)}
      >
        <DoneIcon />
      </IconButton>
      <IconButton onClick={() => cancelEditingOption(opt.id)}>
        <CloseIcon />
      </IconButton>
    </>
  )

  const getOptionJSX = (opt: QuestionOption) => (
    <>
      <TextField
        sx={{ mr: 1 }}
        variant="outlined"
        size="small"
        value={opt.text}
        disabled
      />
      {!isEditMode && (
        <>
          <IconButton onClick={() => editOption(opt.id)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => deleteOption(opt.id)}>
            <DeleteOutlineIcon />
          </IconButton>
        </>
      )}
    </>
  )

  return (
    <Box>
      <Typography variant="h6" sx={{ mt: 2 }}>
        گزینه‌ها
      </Typography>
      <TransitionGroup>
        {tempOptions.map((opt: QuestionOption) => (
          <Collapse in={!!opt.id} key={opt.id}>
            <Box
              sx={{
                py: 1,
                borderRadius: 2,
                border:
                  editingOptionId === opt.id || addingOptionId === opt.id
                    ? '2px solid blue'
                    : 'none',
              }}
            >
              {mode === QuestionMode.Checkbox ? (
                <Checkbox disabled sx={{ mr: 1 }} />
              ) : (
                <Radio disabled sx={{ mr: 1 }} />
              )}
              {editingOptionId === opt.id || addingOptionId === opt.id
                ? getEditingOptionJSX(opt)
                : getOptionJSX(opt)}
            </Box>
          </Collapse>
        ))}
      </TransitionGroup>
      <Button
        sx={{ mt: 2 }}
        startIcon={<AddIcon />}
        onClick={addTempOption}
        variant="text"
        disableElevation
        disabled={isEditMode}
      >
        افزودن گزینه
      </Button>
    </Box>
  )
}

export default CreateQuestionModalOptions
