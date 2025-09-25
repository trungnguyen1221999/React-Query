import { keepPreviousData, QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { deleteStudentById, getStudentById, getStudents } from 'apis/students.api'
import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { Student } from 'types/types'
import {toast} from 'react-toastify'
import { queryClient } from 'index'
const limit = 10
export default function Students() {
  // const [students, setStudents] = useState<Student[]>([])
  // const [isLoading, setIsLoading] = useState(true)
  // useEffect(() => {
  //   getStudents(1, 10)
  //     .then((res) => setStudents(res.data))
  //     .finally(() => setIsLoading(false))
  // }, [])
  const [searchParams] = useSearchParams()
  const searchParamsObject = Object.fromEntries([...searchParams])
  const page = Number(searchParamsObject.page) || 1
  const queryStudent = useQuery({
    queryKey: ['students', page],
    queryFn: () => getStudents(page, limit),
    placeholderData: keepPreviousData
  })
  const preFetching = async (id : string)=>{
    await queryClient.prefetchQuery({
      queryKey: ['student', id],
      queryFn: () => getStudentById(Number(id)),
    })
  }

  const { data, isLoading } = queryStudent
  const totalStudents = data?.headers['x-total-count']
  const totalPages = totalStudents ? Math.ceil(Number(totalStudents) / limit) : 0
  const deleteMutation = useMutation({
    mutationFn: deleteStudentById
  })
  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        queryStudent.refetch()
    toast.success('Delete student successfully')
    }})
  }
    
  return (
    <div>
      <h1 className='text-lg'>Students</h1>
      <StyledButton>
        <Link to='/students/add'>Add</Link>
      </StyledButton>
      {isLoading && (
        <>
          <div role='status' className='mt-6 animate-pulse'>
            <div className='mb-4 h-4  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <span className='sr-only'>Loading...</span>
          </div>
        </>
      )}
      <div className='relative mt-6 overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
          <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='py-3 px-6'>
                #
              </th>
              <th scope='col' className='py-3 px-6'>
                Avatar
              </th>
              <th scope='col' className='py-3 px-6'>
                Name
              </th>
              <th scope='col' className='py-3 px-6'>
                Email
              </th>
              <th scope='col' className='py-3 px-6'>
                <span className='sr-only'>Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              data?.data.map((student: Student) => (
                <tr onMouseEnter={()=>preFetching(String(student.id))}
                  key={student.id}
                  className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'
                >
                  <td className='py-4 px-6'>{student.id - 6}</td>
                  <td className='py-4 px-6'>
                    <img src={student.avatar} alt='student' className='h-5 w-5' />
                  </td>
                  <th scope='row' className='whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white'>
                    {student.last_name}
                  </th>
                  <td className='py-4 px-6'>{student.email}</td>
                  <td className='py-4 px-6 text-right'>
                    <Link
                      to={`/students/${student.id}`}
                      className='mr-5 font-medium text-blue-600 hover:underline dark:text-blue-500'
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className='font-medium text-red-600 dark:text-red-500'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className='mt-6 flex justify-center'>
        <nav aria-label='Page navigation example'>
          <ul className='inline-flex -space-x-px'>
            <li>
              {page === 1 ? (
                <span className='cursor-not-allowed rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                  Previous
                </span>
              ) : (
                <Link
                  to={`/students?page=${page - 1}`}
                  className=' rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                >
                  Previous
                </Link>
              )}
            </li>
            {Array(totalPages)
              .fill(0)
              .map((_, index) => {
                const currentPage = index + 1
                return (
                  <StyledActive key={index}>
                    <Link
                      to={`/students?page=${currentPage}`}
                      className={`border border-gray-300 py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700
      ${currentPage === page ? 'active' : ''}`}
                    >
                      {currentPage}
                    </Link>
                  </StyledActive>
                )
              })}
            <li>
              {page === totalPages ? (
                <a className='cursor-not-allowed rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                  Next
                </a>
              ) : (
                <Link
                  className='rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  to={`/students?page=${page + 1}`}
                >
                  Next
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

const StyledActive = styled.li`
  .active {
    background-color: green !important;
    color: white !important;
  }
`
const StyledButton = styled.a`
  display: inline-block;
  padding: 8px 12px;
  background-color: blue;
  color: white;
  transition: opacity 0.3s;
  margin-top: 20px;
  &:hover {
    opacity: 0.8;
  }
`
