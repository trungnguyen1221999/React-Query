import { Student } from './../types/types'
import http from 'untils/until'

export const getStudents = async (page: number | string, limit: number | string) => {
  return http.get<Student[]>(`students`, { params: { _page: page, _limit: limit } })
}
