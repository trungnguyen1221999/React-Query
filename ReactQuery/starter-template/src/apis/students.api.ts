import { AllInformationStudent, Student } from './../types/types'
import http from 'untils/until'

export const getStudents = async (page: number | string, limit: number | string) => {
  return http.get<Student[]>(`students`, { params: { _page: page, _limit: limit } })
}

export const AddStudents = async (student: Omit<AllInformationStudent, 'id'>) => {
  return http.post<Student>('students', student)
}

export const EditStudents = async (student: AllInformationStudent) => {
  return http.put<Student>(`students/${student.id}`, student)
}

export const getStudentById = async (id: string | number) => {
  return http.get<AllInformationStudent>(`students/${id}`)
}
