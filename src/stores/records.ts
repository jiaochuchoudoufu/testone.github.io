import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Record } from '@/types'

// localStorage 的 key
const STORAGE_KEY = 'records'

// 从 localStorage 读取初始数据
const loadFromStorage = (): Record[] => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    return JSON.parse(stored) as Record[]
  }
  // 默认数据
  return [
    { id: 1, type: '支出', category: '餐饮', amount: 50, date: '2024-03-22', note: '午餐' },
    { id: 2, type: '收入', category: '工资', amount: 5000, date: '2024-03-21', note: '3月工资' }
  ]
}

// 保存到 localStorage
const saveToStorage = (records: Record[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
}

export const useRecordsStore = defineStore('records', () => {
  // state：从 localStorage 加载数据
  const records = ref<Record[]>(loadFromStorage())
  
  // getters
  const totalIncome = computed<number>(() => {
    return records.value
      .filter(r => r.type === '收入')
      .reduce((sum, r) => sum + r.amount, 0)
  })
  
  const totalExpense = computed<number>(() => {
    return records.value
      .filter(r => r.type === '支出')
      .reduce((sum, r) => sum + r.amount, 0)
  })
  
  const balance = computed(() => totalIncome.value - totalExpense.value)
  
  // 获取下一个可用的 id
  const getNextId = (records: Record[]): number => {
    if (records.length === 0) return 1
    const maxId = Math.max(...records.map(r => r.id))
    return maxId + 1
  }
  
  // actions
  const addRecord = (record: Omit<Record, "id">): void => {
    const newRecord: Record = {
      ...record,
      id: getNextId(records.value)
    }
    records.value.push(newRecord)
    saveToStorage(records.value)  // 保存到 localStorage
  }
  
  const deleteRecord = (id: number): void => {
    const index = records.value.findIndex(r => r.id === id)
    if (index !== -1) {
      records.value.splice(index, 1)
      saveToStorage(records.value)  // 保存到 localStorage
    }
  }
  
  const updateRecord = (id: number, updatedRecord: Omit<Record, "id">): void => {
    const index = records.value.findIndex(r => r.id === id)
    if (index !== -1) {
      records.value[index] = { ...updatedRecord, id }
      saveToStorage(records.value)  // 保存到 localStorage
    }
  }
  
  return {
    records,
    totalIncome,
    totalExpense,
    balance,
    addRecord,
    deleteRecord,
    updateRecord
  }
})