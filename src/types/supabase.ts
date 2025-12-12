export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      sl_admins: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          role?: string
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      sl_player_requests: {
        Row: {
          attribute: string
          created_at: string
          denial_reason: string | null
          id: string
          player_name: string
          points: number
          processed_at: string | null
          processed_by: string | null
          status: string
          team_id: string
        }
        Insert: {
          attribute: string
          created_at?: string
          denial_reason?: string | null
          id?: string
          player_name: string
          points: number
          processed_at?: string | null
          processed_by?: string | null
          status?: string
          team_id: string
        }
        Update: {
          attribute?: string
          created_at?: string
          denial_reason?: string | null
          id?: string
          player_name?: string
          points?: number
          processed_at?: string | null
          processed_by?: string | null
          status?: string
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'sl_player_requests_team_id_fkey'
            columns: ['team_id']
            referencedRelation: 'sl_teams'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'sl_player_requests_processed_by_fkey'
            columns: ['processed_by']
            referencedRelation: 'sl_admins'
            referencedColumns: ['id']
          }
        ]
      }
      sl_games: {
        Row: {
          away_team: string
          created_at: string
          created_by: string | null
          id: string
          is_locked: boolean
          kickoff_at: string | null
          result: string | null
          title: string
          updated_at: string
          week_number: number
          home_team: string
        }
        Insert: {
          away_team: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_locked?: boolean
          kickoff_at?: string | null
          result?: string | null
          title: string
          updated_at?: string
          week_number: number
          home_team: string
        }
        Update: {
          away_team?: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_locked?: boolean
          kickoff_at?: string | null
          result?: string | null
          title?: string
          updated_at?: string
          week_number?: number
          home_team?: string
        }
        Relationships: []
      }
      sl_picks: {
        Row: {
          created_at: string
          game_id: string
          id: string
          selection: string
          team_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          game_id: string
          id?: string
          selection: string
          team_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          game_id?: string
          id?: string
          selection?: string
          team_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'sl_picks_game_id_fkey'
            columns: ['game_id']
            referencedRelation: 'sl_games'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'sl_picks_team_id_fkey'
            columns: ['team_id']
            referencedRelation: 'sl_teams'
            referencedColumns: ['id']
          }
        ]
      }
      sl_points_ledger: {
        Row: {
          created_at: string
          created_by: string | null
          game_id: string | null
          id: string
          note: string | null
          points: number
          source: string
          team_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          game_id?: string | null
          id?: string
          note?: string | null
          points: number
          source: string
          team_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          game_id?: string | null
          id?: string
          note?: string | null
          points?: number
          source?: string
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'sl_points_ledger_game_id_fkey'
            columns: ['game_id']
            referencedRelation: 'sl_games'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'sl_points_ledger_team_id_fkey'
            columns: ['team_id']
            referencedRelation: 'sl_teams'
            referencedColumns: ['id']
          }
        ]
      }
      sl_team_codes: {
        Row: {
          pin_hash: string
          team_id: string
          updated_at: string
        }
        Insert: {
          pin_hash: string
          team_id: string
          updated_at?: string
        }
        Update: {
          pin_hash?: string
          team_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'sl_team_codes_team_id_fkey'
            columns: ['team_id']
            referencedRelation: 'sl_teams'
            referencedColumns: ['id']
          }
        ]
      }
      sl_teams: {
        Row: {
          created_at: string
          id: string
          name: string
          short_code: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          short_code?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          short_code?: string | null
        }
        Relationships: []
      }
      sl_weeks: {
        Row: {
          created_at: string
          label: string
          week_number: number
        }
        Insert: {
          created_at?: string
          label: string
          week_number: number
        }
        Update: {
          created_at?: string
          label?: string
          week_number?: number
        }
        Relationships: []
      }
      phl_admins: {
        Row: {
          created_at: string
          created_by: string | null
          email: string
          id: string
          pin_hash: string | null
          role: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          email: string
          id?: string
          pin_hash?: string | null
          role?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          email?: string
          id?: string
          pin_hash?: string | null
          role?: string
        }
        Relationships: []
      }
      phl_games: {
        Row: {
          away_team: string
          created_at: string
          created_by: string | null
          id: string
          is_locked: boolean
          kickoff_at: string | null
          result: string | null
          title: string
          updated_at: string
          week_number: number
          home_team: string
        }
        Insert: {
          away_team: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_locked?: boolean
          kickoff_at?: string | null
          result?: string | null
          title: string
          updated_at?: string
          week_number: number
          home_team: string
        }
        Update: {
          away_team?: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_locked?: boolean
          kickoff_at?: string | null
          result?: string | null
          title?: string
          updated_at?: string
          week_number?: number
          home_team?: string
        }
        Relationships: []
      }
      phl_picks: {
        Row: {
          created_at: string
          game_id: string
          id: string
          selection: string
          team_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          game_id: string
          id?: string
          selection: string
          team_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          game_id?: string
          id?: string
          selection?: string
          team_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'phl_picks_game_id_fkey'
            columns: ['game_id']
            referencedRelation: 'phl_games'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'phl_picks_team_id_fkey'
            columns: ['team_id']
            referencedRelation: 'phl_teams'
            referencedColumns: ['id']
          }
        ]
      }
      phl_points_ledger: {
        Row: {
          created_at: string
          created_by: string | null
          game_id: string | null
          id: string
          note: string | null
          points: number
          source: string
          team_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          game_id?: string | null
          id?: string
          note?: string | null
          points: number
          source: string
          team_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          game_id?: string | null
          id?: string
          note?: string | null
          points?: number
          source?: string
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'phl_points_ledger_game_id_fkey'
            columns: ['game_id']
            referencedRelation: 'phl_games'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'phl_points_ledger_team_id_fkey'
            columns: ['team_id']
            referencedRelation: 'phl_teams'
            referencedColumns: ['id']
          }
        ]
      }
      phl_team_codes: {
        Row: {
          pin_hash: string
          team_id: string
          updated_at: string
        }
        Insert: {
          pin_hash: string
          team_id: string
          updated_at?: string
        }
        Update: {
          pin_hash?: string
          team_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'phl_team_codes_team_id_fkey'
            columns: ['team_id']
            referencedRelation: 'phl_teams'
            referencedColumns: ['id']
          }
        ]
      }
      phl_teams: {
        Row: {
          created_at: string
          id: string
          name: string
          short_code: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          short_code?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          short_code?: string | null
        }
        Relationships: []
      }
      phl_weeks: {
        Row: {
          created_at: string
          label: string
          week_number: number
        }
        Insert: {
          created_at?: string
          label: string
          week_number: number
        }
        Update: {
          created_at?: string
          label?: string
          week_number?: number
        }
        Relationships: []
      }
      phl_player_requests: {
        Row: {
          attribute: string
          created_at: string
          denial_reason: string | null
          id: string
          player_name: string
          points: number
          processed_at: string | null
          processed_by: string | null
          status: string
          team_id: string
        }
        Insert: {
          attribute: string
          created_at?: string
          denial_reason?: string | null
          id?: string
          player_name: string
          points: number
          processed_at?: string | null
          processed_by?: string | null
          status?: string
          team_id: string
        }
        Update: {
          attribute?: string
          created_at?: string
          denial_reason?: string | null
          id?: string
          player_name?: string
          points?: number
          processed_at?: string | null
          processed_by?: string | null
          status?: string
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'phl_player_requests_team_id_fkey'
            columns: ['team_id']
            referencedRelation: 'phl_teams'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'phl_player_requests_processed_by_fkey'
            columns: ['processed_by']
            referencedRelation: 'phl_admins'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      sl_team_points: {
        Row: {
          team_id: string | null
          total_points: number | null
        }
        Relationships: []
      }
      phl_team_points: {
        Row: {
          team_id: string | null
          total_points: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      sl_award_points_for_game: {
        Args: {
          p_game_id: string
        }
        Returns: {
          team_id: string
          points_awarded: number
        }[]
      }
      sl_authenticate_team: {
        Args: {
          p_team_name: string
          p_pin: string
        }
        Returns: {
          id: string
          name: string
          short_code: string | null
        }
      }
      sl_authenticate_admin: {
        Args: {
          p_email: string
          p_pin: string
        }
        Returns: {
          email: string
          role: string
        }[]
      }
      sl_set_game_lock: {
        Args: {
          p_game_id: string
          p_lock: boolean
        }
        Returns: {
          id: string
          is_locked: boolean
        }
      }
      phl_award_points_for_game: {
        Args: {
          p_game_id: string
        }
        Returns: {
          team_id: string
          points_awarded: number
        }[]
      }
      phl_authenticate_team: {
        Args: {
          p_team_name: string
          p_pin: string
        }
        Returns: {
          id: string
          name: string
          short_code: string | null
        }
      }
      phl_authenticate_admin: {
        Args: {
          p_email: string
          p_pin: string
        }
        Returns: {
          email: string
          role: string
        }[]
      }
      phl_set_game_lock: {
        Args: {
          p_game_id: string
          p_lock: boolean
        }
        Returns: {
          id: string
          is_locked: boolean
        }
      }
    }
    Enums: {}
    CompositeTypes: {}
  }
}
