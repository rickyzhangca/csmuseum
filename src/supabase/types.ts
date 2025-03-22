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
      cities: {
        Row: {
          created_at: string
          creator_id: number | null
          id: string
          name: string
          outline: string
          posted_by_id: string | null
          shots_count: number
          source_url: string | null
          source_url_type: Database["public"]["Enums"]["URL_TYPE"] | null
        }
        Insert: {
          created_at?: string
          creator_id?: number | null
          id?: string
          name: string
          outline: string
          posted_by_id?: string | null
          shots_count?: number
          source_url?: string | null
          source_url_type?: Database["public"]["Enums"]["URL_TYPE"] | null
        }
        Update: {
          created_at?: string
          creator_id?: number | null
          id?: string
          name?: string
          outline?: string
          posted_by_id?: string | null
          shots_count?: number
          source_url?: string | null
          source_url_type?: Database["public"]["Enums"]["URL_TYPE"] | null
        }
        Relationships: [
          {
            foreignKeyName: "cities_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "cities_with_creators"
            referencedColumns: ["creator_id"]
          },
          {
            foreignKeyName: "cities_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "creators"
            referencedColumns: ["id"]
          },
        ]
      }
      creators: {
        Row: {
          created_at: string
          id: number
          name: string
          posted_by_id: string | null
          profile_url: string | null
          profile_url_type: Database["public"]["Enums"]["URL_TYPE"] | null
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          posted_by_id?: string | null
          profile_url?: string | null
          profile_url_type?: Database["public"]["Enums"]["URL_TYPE"] | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          posted_by_id?: string | null
          profile_url?: string | null
          profile_url_type?: Database["public"]["Enums"]["URL_TYPE"] | null
        }
        Relationships: []
      }
    }
    Views: {
      cities_with_creators: {
        Row: {
          city_created_at: string | null
          city_id: string | null
          city_name: string | null
          city_outline: string | null
          city_posted_by_id: string | null
          city_source_url: string | null
          city_source_url_type: Database["public"]["Enums"]["URL_TYPE"] | null
          creator_created_at: string | null
          creator_id: number | null
          creator_name: string | null
          creator_posted_by_id: string | null
          creator_profile_url: string | null
          creator_profile_url_type:
            | Database["public"]["Enums"]["URL_TYPE"]
            | null
          shots_count: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_all_cities_with_creators: {
        Args: Record<PropertyKey, never>
        Returns: Json[]
      }
      get_city_with_creator: {
        Args: {
          city_id: string
        }
        Returns: Json
      }
      link_city_to_creator: {
        Args: {
          p_city_id: string
          p_creator_id: number
        }
        Returns: Json
      }
      update_city_creator: {
        Args: {
          p_city_id: string
          p_creator_name: string
          p_creator_profile_url?: string
          p_creator_profile_url_type?: string
          p_user_id?: string
        }
        Returns: Json
      }
    }
    Enums: {
      URL_TYPE: "youtube" | "xiaohongshu" | "twitter"
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
