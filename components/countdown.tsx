'use client'
import { useState, useEffect } from 'react'

const EVENT_DATE = new Date('2026-12-27T05:00:00')

function getTimeLeft() {
  const diff = EVENT_DATE.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ]

  return (
    <div className="flex gap-6 justify-center">
      {units.map((u) => (
        <div key={u.label} className="text-center">
          <div className="text-4xl font-bold" style={{ color: 'var(--gold)' }}>
            {String(u.value).padStart(2, '0')}
          </div>
          <div className="text-xs uppercase tracking-wide mt-1" style={{ color: 'var(--charcoal)' }}>
            {u.label}
          </div>
        </div>
      ))}
    </div>
  )
}