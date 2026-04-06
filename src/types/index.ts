//记录类型
export interface Record {
    id: number
    type: '支出' | '收入'
    category: string
    amount: number
    date: string
    note: string
}