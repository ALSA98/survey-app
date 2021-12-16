// types
import { style } from '@mui/system'
import { FC } from 'react'
import { Question, QuestionMode } from '../types/question'
// components
import CreateQuestionListItem from './CreateQuestionListItem'
import CreateQuestionListNew from './CreateQuestionListNew'

type props = {
  items: Question[]
  onItemClick: (id: string) => void
  onNewClick: () => void
}

const CreateQuestionList: FC<props> = ({ items, onItemClick, onNewClick }) => {
  const welcomePage = (
    <div style={{ marginBottom: '16px', borderBottom: '1px solid #eee' }}>
      <CreateQuestionListItem
        key={items[0].id}
        name={items[0].title}
        mode={items[0].mode}
        onClick={() => onItemClick(items[0].id)}
      />
    </div>
  )
  const endPage = (
    <div style={{ paddingTop: '16px', borderTop: '1px solid #eee' }}>
      <CreateQuestionListItem
        key={items[items.length - 1].id}
        name={items[items.length - 1].title}
        mode={items[items.length - 1].mode}
        onClick={() => onItemClick(items[items.length - 1].id)}
      />
    </div>
  )
  const questions = items
    .slice(1, items.length - 1) // first is always welcome and last is always goodbye page!
    .map(({ id, title, mode }) => (
      <CreateQuestionListItem
        key={id}
        name={title}
        mode={mode}
        onClick={() => onItemClick(id)}
      />
    ))

  return (
    <>
      {welcomePage}
      {questions}
      <CreateQuestionListNew onClick={() => onNewClick()} />
      {endPage}
    </>
  )
}

export default CreateQuestionList
