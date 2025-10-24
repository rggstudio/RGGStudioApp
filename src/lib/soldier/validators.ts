import { z } from 'zod'

export const teamLoginSchema = z.object({
  teamName: z.string().min(2, 'Team name is required'),
  pin: z
    .string()
    .min(4, 'PIN must be 4 digits')
    .max(4, 'PIN must be 4 digits')
    .regex(/^\d{4}$/, 'PIN must be numeric'),
})

export const updatePickSchema = z.object({
  gameId: z.string().uuid(),
  selection: z.enum(['home', 'away']),
})

export const createGameSchema = z.object({
  title: z.string().min(3),
  weekNumber: z.number().int().min(1).max(22),
  homeTeam: z.string().min(2),
  awayTeam: z.string().min(2),
  kickoffAt: z.string().nullable().optional(),
})

export const updateGameResultSchema = z.object({
  result: z.enum(['home', 'away']),
})

export const lockGameSchema = z.object({
  lock: z.boolean(),
})

export const adjustPointsSchema = z.object({
  teamId: z.string().uuid(),
  points: z.number().int(),
  note: z.string().min(2).optional(),
})
