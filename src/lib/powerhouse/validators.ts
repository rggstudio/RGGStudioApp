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

export const ATTRIBUTES = [
  'Agility',
  'Strength',
  'Awareness',
  'Carrying',
  'BC Vision',
  'Break Tackle',
  'Trucking',
  'Stiff Arm',
  'Change of Direction',
  'Spin Move',
  'Juke Move',
  'Catching',
  'Catch In Traffic',
  'Spectacular Catch',
  'Short Route Running',
  'Medium Route Running',
  'Deep Route Running',
  'Release',
  'Jumping',
  'Throwing Power',
  'Short Throw Accuracy',
  'Medium Throw Accuracy',
  'Deep Throw Accuracy',
  'Throw on the Run',
  'Throw Under Pressure',
  'Break Sack',
  'Play Action',
  'Pass Blocking',
  'Pass Block Power',
  'Pass Block Finesse',
  'Run Blocking',
  'Run Block Power',
  'Run Block Finesse',
  'Lead Block',
  'Impact Blocking',
  'Play Recognition',
  'Tackling',
  'Hit Power',
  'Block Shedding',
  'Finesse Moves',
  'Power Moves',
  'Pursuit',
  'Man Coverage',
  'Zone Coverage',
  'Press',
  'Kick/Punt Return',
  'Kicking Power',
  'Kicking Accuracy',
  'Stamina',
  'Toughness',
  'Injury',
  'Long Snap',
] as const

export const playerRequestSchema = z.object({
  playerName: z.string().min(1, 'Player name is required'),
  attribute: z.enum(ATTRIBUTES as [string, ...string[]], {
    errorMap: () => ({ message: 'Please select a valid attribute' }),
  }),
  points: z.number().int().positive('Points must be a positive number'),
})

export const denyRequestSchema = z.object({
  denialReason: z.string().min(1, 'Denial reason is required'),
})

