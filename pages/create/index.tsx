import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
//types
import { Question, QuestionMode } from '../../types/question'
// components
import CreateQuestionList from '../../components/CreateQuestionList'
import CreateQuestionModal from '../../components/CreateQuestionModal'
// ui components
import { Container } from '@mui/material'
// utils
import generateUniqueId from '../../utils/id-generator'

const tempQuestions: Question[] = [
  {
    id: 'welcome_page',
    page: 'welcome',
    title: 'صفحه خوش‌آمدگویی',
    mode: QuestionMode.Info,
  },
  {
    id: generateUniqueId(8),
    title: 'سوال اول',
    page: 1,
    mode: QuestionMode.Text,
  },
  {
    id: generateUniqueId(8),
    title: 'سوال دوم',
    page: 2,
    mode: QuestionMode.Checkbox,
  },
  {
    id: generateUniqueId(8),
    title: 'سوال سوم',
    page: 3,
    mode: QuestionMode.Text,
  },
  {
    id: 'end_page',
    title: 'دانکا!',
    page: 'end',
    mode: QuestionMode.Info,
  },
]

const emptyData: Question = {
  id: generateUniqueId(8),
  title: '',
  page: tempQuestions.length - 1,
  mode: QuestionMode.Text,
}

const getModalData = (id: string) => {
  const index = tempQuestions.findIndex((item) => item.id === id)
  return tempQuestions[index]
}

const Home: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isNew, setIsNew] = useState<boolean>(false)
  const [modalData, setModalData] = useState<Question>(emptyData)

  const handleItemClick = (id: string) => {
    setIsNew(false)
    setIsModalOpen(true)
    const data: Question = getModalData(id)
    setModalData(data)
  }
  const handleNewClick = () => {
    setIsNew(true)
    setIsModalOpen(true)
    setModalData(emptyData)
  }

  const handleModalClose = ({ save }: { save: boolean }) => {
    setIsModalOpen(false)
    if (save) alert('gonna save that')
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="sm" sx={{ py: 4 }}>
        <CreateQuestionModal
          isOpen={isModalOpen}
          data={modalData}
          onClose={handleModalClose}
        />
        <CreateQuestionList
          items={tempQuestions}
          onItemClick={handleItemClick}
          onNewClick={handleNewClick}
        />
      </Container>
    </div>
  )
}

export default Home
