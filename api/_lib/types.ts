export type FileType = 'png' | 'jpeg' | 'pdf' | 'html'
export type Theme = 'light' | 'dark'
export type Icon = string
export type IconResolver = Function

export interface ParsedRequest {
  fileType: FileType
  text: string
  theme: Theme
  md: boolean
  fontSize: string
  images: string[]
  widths: string[]
  heights: string[]
  document: any
}
