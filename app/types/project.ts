export interface Project {
  id: string
  title: string
  client: string
  status: 'in-progress' | 'completed' | 'on-hold'
  deadline: string
}