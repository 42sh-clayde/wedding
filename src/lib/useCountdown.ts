'use client'
import { useState, useEffect } from 'react'

export interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  isOver: boolean
}

function calculate(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true }
  const s = Math.floor(diff / 1000)
  return {
    days: Math.min(Math.floor(s / 86400), 999),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    isOver: false,
  }
}

export function useCountdown(target: Date): TimeLeft {
  const [time, setTime] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: false })

  useEffect(() => {
    setTime(calculate(target))
    const id = setInterval(() => setTime(calculate(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  return time
}

export function introText(days: number): string {
  if (days <= 0) return "C'est le grand jour !"
  if (days <= 1) return 'Demain, on dit oui.'
  if (days <= 7) return 'Plus que quelques jours…'
  if (days <= 30) return 'Le compte est bon.'
  if (days <= 90) return 'La date approche doucement.'
  return 'Encore un peu de patience…'
}
