export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      applications: {
        Row: {
          application_date: string
          application_time: string
          certificate_url: string | null
          created_at: string
          dti_certificate_no: string
          establishment_id: string
          establishment_name: string
          id: string
          inspection_schedule: string | null
          inspector_id: string | null
          owner_id: string
          rejection_reason: string | null
          status: Database["public"]["Enums"]["application_status"]
          type: Database["public"]["Enums"]["application_type"]
          updated_at: string
          uploaded_files: Json | null
        }
        Insert: {
          application_date?: string
          application_time?: string
          certificate_url?: string | null
          created_at?: string
          dti_certificate_no: string
          establishment_id: string
          establishment_name: string
          id?: string
          inspection_schedule?: string | null
          inspector_id?: string | null
          owner_id: string
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          type: Database["public"]["Enums"]["application_type"]
          updated_at?: string
          uploaded_files?: Json | null
        }
        Update: {
          application_date?: string
          application_time?: string
          certificate_url?: string | null
          created_at?: string
          dti_certificate_no?: string
          establishment_id?: string
          establishment_name?: string
          id?: string
          inspection_schedule?: string | null
          inspector_id?: string | null
          owner_id?: string
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          type?: Database["public"]["Enums"]["application_type"]
          updated_at?: string
          uploaded_files?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_establishment_id_fkey"
            columns: ["establishment_id"]
            isOneToOne: false
            referencedRelation: "establishments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_inspector_id_fkey"
            columns: ["inspector_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      establishments: {
        Row: {
          created_at: string
          dti_certificate_no: string
          establishment_name: string
          id: string
          owner_id: string
          rejection_reason: string | null
          status: Database["public"]["Enums"]["establishment_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          dti_certificate_no: string
          establishment_name: string
          id?: string
          owner_id: string
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["establishment_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          dti_certificate_no?: string
          establishment_name?: string
          id?: string
          owner_id?: string
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["establishment_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "establishments_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      inspection_checklists: {
        Row: {
          application_id: string
          checklist_items: Json
          id: string
          inspection_date: string
          inspection_status: Database["public"]["Enums"]["inspection_status"]
          inspection_time: string
          inspector_id: string
          inspector_signature: string
          remarks: string | null
          submitted_at: string
          uploaded_images: Json | null
        }
        Insert: {
          application_id: string
          checklist_items: Json
          id?: string
          inspection_date: string
          inspection_status: Database["public"]["Enums"]["inspection_status"]
          inspection_time: string
          inspector_id: string
          inspector_signature: string
          remarks?: string | null
          submitted_at?: string
          uploaded_images?: Json | null
        }
        Update: {
          application_id?: string
          checklist_items?: Json
          id?: string
          inspection_date?: string
          inspection_status?: Database["public"]["Enums"]["inspection_status"]
          inspection_time?: string
          inspector_id?: string
          inspector_signature?: string
          remarks?: string | null
          submitted_at?: string
          uploaded_images?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "inspection_checklists_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inspection_checklists_inspector_id_fkey"
            columns: ["inspector_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_status: Database["public"]["Enums"]["establishment_status"]
          created_at: string
          email: string | null
          first_name: string
          id: string
          last_name: string
          middle_name: string | null
          position: string | null
          rejection_reason: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          account_status?: Database["public"]["Enums"]["establishment_status"]
          created_at?: string
          email?: string | null
          first_name: string
          id: string
          last_name: string
          middle_name?: string | null
          position?: string | null
          rejection_reason?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          account_status?: Database["public"]["Enums"]["establishment_status"]
          created_at?: string
          email?: string | null
          first_name?: string
          id?: string
          last_name?: string
          middle_name?: string | null
          position?: string | null
          rejection_reason?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: {
          user_id: string
        }
        Returns: string
      }
    }
    Enums: {
      application_status:
        | "unscheduled"
        | "for_inspection"
        | "inspected"
        | "approved"
        | "rejected"
      application_type: "fsec" | "fsic-business" | "fsic-occupancy"
      establishment_status:
        | "unregistered"
        | "pending"
        | "registered"
        | "rejected"
      inspection_status: "pass" | "fail" | "conditional"
      user_role: "admin" | "inspector" | "owner"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
