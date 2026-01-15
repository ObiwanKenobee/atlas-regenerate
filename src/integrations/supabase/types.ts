export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      impact_metrics: {
        Row: {
          category: string
          created_at: string
          id: string
          metric_name: string
          metric_unit: string | null
          metric_value: number
          recorded_at: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          metric_name: string
          metric_unit?: string | null
          metric_value: number
          recorded_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          metric_name?: string
          metric_unit?: string | null
          metric_value?: number
          recorded_at?: string
        }
        Relationships: []
      }
      organizations: {
        Row: {
          contact_info: Json | null
          created_at: string
          description: string | null
          id: string
          location: Json | null
          logo_url: string | null
          name: string
          organization_type: string
          updated_at: string
          verification_status: string | null
          website_url: string | null
        }
        Insert: {
          contact_info?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          location?: Json | null
          logo_url?: string | null
          name: string
          organization_type?: string
          updated_at?: string
          verification_status?: string | null
          website_url?: string | null
        }
        Update: {
          contact_info?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          location?: Json | null
          logo_url?: string | null
          name?: string
          organization_type?: string
          updated_at?: string
          verification_status?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          onboarding_completed: boolean | null
          organization: string | null
          role: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          onboarding_completed?: boolean | null
          organization?: string | null
          role?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          onboarding_completed?: boolean | null
          organization?: string | null
          role?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      project_investments: {
        Row: {
          amount: number
          created_at: string
          id: string
          investment_type: string | null
          investor_id: string
          project_id: string
          status: string | null
          transaction_date: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          investment_type?: string | null
          investor_id: string
          project_id: string
          status?: string | null
          transaction_date?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          investment_type?: string | null
          investor_id?: string
          project_id?: string
          status?: string | null
          transaction_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_investments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          biodiversity_score: number | null
          carbon_sequestered: number | null
          created_at: string
          description: string | null
          end_date: string | null
          funding_goal: number | null
          funding_raised: number | null
          id: string
          impact_metrics: Json | null
          location: Json | null
          organization_id: string | null
          owner_id: string
          project_name: string
          project_type: string
          start_date: string | null
          status: string | null
          total_area_hectares: number | null
          updated_at: string
          verification_status: string | null
        }
        Insert: {
          biodiversity_score?: number | null
          carbon_sequestered?: number | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          funding_goal?: number | null
          funding_raised?: number | null
          id?: string
          impact_metrics?: Json | null
          location?: Json | null
          organization_id?: string | null
          owner_id: string
          project_name: string
          project_type?: string
          start_date?: string | null
          status?: string | null
          total_area_hectares?: number | null
          updated_at?: string
          verification_status?: string | null
        }
        Update: {
          biodiversity_score?: number | null
          carbon_sequestered?: number | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          funding_goal?: number | null
          funding_raised?: number | null
          id?: string
          impact_metrics?: Json | null
          location?: Json | null
          organization_id?: string | null
          owner_id?: string
          project_name?: string
          project_type?: string
          start_date?: string | null
          status?: string | null
          total_area_hectares?: number | null
          updated_at?: string
          verification_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_tiers: {
        Row: {
          analytics_access: boolean | null
          annual_price: number
          created_at: string
          features: string[] | null
          id: string
          is_active: boolean | null
          max_projects: number | null
          monthly_price: number
          priority_support: boolean | null
          tier_name: string
        }
        Insert: {
          analytics_access?: boolean | null
          annual_price?: number
          created_at?: string
          features?: string[] | null
          id?: string
          is_active?: boolean | null
          max_projects?: number | null
          monthly_price?: number
          priority_support?: boolean | null
          tier_name: string
        }
        Update: {
          analytics_access?: boolean | null
          annual_price?: number
          created_at?: string
          features?: string[] | null
          id?: string
          is_active?: boolean | null
          max_projects?: number | null
          monthly_price?: number
          priority_support?: boolean | null
          tier_name?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          created_at: string
          end_date: string | null
          id: string
          is_active: boolean | null
          payment_status: string | null
          start_date: string
          tier_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          payment_status?: string | null
          start_date: string
          tier_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          payment_status?: string | null
          start_date?: string
          tier_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "subscription_tiers"
            referencedColumns: ["id"]
          },
        ]
      }
      waitlist: {
        Row: {
          created_at: string
          email: string
          id: string
          organization: string | null
          stakeholder_type: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          organization?: string | null
          stakeholder_type?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          organization?: string | null
          stakeholder_type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
