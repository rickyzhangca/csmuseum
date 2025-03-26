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
      assets: {
        Row: {
          created_at: string
          creator_id: string | null
          id: string
          name: string
          outline: string
          posted_by_id: string | null
          source_url: string | null
          source_url_type: Database["public"]["Enums"]["URL_TYPE"] | null
          thumbnail_image_id: string | null
        }
        Insert: {
          created_at?: string
          creator_id?: string | null
          id?: string
          name: string
          outline: string
          posted_by_id?: string | null
          source_url?: string | null
          source_url_type?: Database["public"]["Enums"]["URL_TYPE"] | null
          thumbnail_image_id?: string | null
        }
        Update: {
          created_at?: string
          creator_id?: string | null
          id?: string
          name?: string
          outline?: string
          posted_by_id?: string | null
          source_url?: string | null
          source_url_type?: Database["public"]["Enums"]["URL_TYPE"] | null
          thumbnail_image_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assets_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "assets_details"
            referencedColumns: ["creator_id"]
          },
          {
            foreignKeyName: "assets_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "cities_details"
            referencedColumns: ["creator_id"]
          },
          {
            foreignKeyName: "assets_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "creators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "shots_details"
            referencedColumns: ["creator_id"]
          },
          {
            foreignKeyName: "assets_thumbnail_image_id_fkey"
            columns: ["thumbnail_image_id"]
            isOneToOne: false
            referencedRelation: "assets_images"
            referencedColumns: ["id"]
          },
        ]
      }
      assets_images: {
        Row: {
          content_id: string
          created_at: string
          id: string
          posted_by: string
        }
        Insert: {
          content_id: string
          created_at?: string
          id: string
          posted_by?: string
        }
        Update: {
          content_id?: string
          created_at?: string
          id?: string
          posted_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "assets_images_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_images_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "assets_details"
            referencedColumns: ["id"]
          },
        ]
      }
      cities: {
        Row: {
          created_at: string
          creator_id: string | null
          id: string
          name: string
          outline: string
          posted_by_id: string | null
          source_url: string | null
          source_url_type: Database["public"]["Enums"]["URL_TYPE"] | null
          thumbnail_image_id: string | null
        }
        Insert: {
          created_at?: string
          creator_id?: string | null
          id?: string
          name: string
          outline: string
          posted_by_id?: string | null
          source_url?: string | null
          source_url_type?: Database["public"]["Enums"]["URL_TYPE"] | null
          thumbnail_image_id?: string | null
        }
        Update: {
          created_at?: string
          creator_id?: string | null
          id?: string
          name?: string
          outline?: string
          posted_by_id?: string | null
          source_url?: string | null
          source_url_type?: Database["public"]["Enums"]["URL_TYPE"] | null
          thumbnail_image_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cities_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "assets_details"
            referencedColumns: ["creator_id"]
          },
          {
            foreignKeyName: "cities_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "cities_details"
            referencedColumns: ["creator_id"]
          },
          {
            foreignKeyName: "cities_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "creators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cities_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "shots_details"
            referencedColumns: ["creator_id"]
          },
          {
            foreignKeyName: "cities_thumbnail_image_id_fkey"
            columns: ["thumbnail_image_id"]
            isOneToOne: false
            referencedRelation: "cities_images"
            referencedColumns: ["id"]
          },
        ]
      }
      cities_images: {
        Row: {
          content_id: string
          created_at: string
          id: string
          posted_by: string
        }
        Insert: {
          content_id: string
          created_at?: string
          id: string
          posted_by?: string
        }
        Update: {
          content_id?: string
          created_at?: string
          id?: string
          posted_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "cities_images_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cities_images_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "cities_details"
            referencedColumns: ["id"]
          },
        ]
      }
      creators: {
        Row: {
          created_at: string
          id: string
          name: string
          posted_by_id: string
          profile_url: string | null
          profile_url_type: Database["public"]["Enums"]["URL_TYPE"] | null
        }
        Insert: {
          created_at?: string
          id: string
          name: string
          posted_by_id: string
          profile_url?: string | null
          profile_url_type?: Database["public"]["Enums"]["URL_TYPE"] | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          posted_by_id?: string
          profile_url?: string | null
          profile_url_type?: Database["public"]["Enums"]["URL_TYPE"] | null
        }
        Relationships: []
      }
      requests: {
        Row: {
          content: string
          created_at: string
          id: number
          url: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          url: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          url?: string
        }
        Relationships: []
      }
      shots: {
        Row: {
          created_at: string
          creator_id: string | null
          id: string
          name: string
          outline: string
          posted_by_id: string | null
          source_url: string | null
          source_url_type: Database["public"]["Enums"]["URL_TYPE"] | null
          thumbnail_image_id: string | null
        }
        Insert: {
          created_at?: string
          creator_id?: string | null
          id?: string
          name: string
          outline: string
          posted_by_id?: string | null
          source_url?: string | null
          source_url_type?: Database["public"]["Enums"]["URL_TYPE"] | null
          thumbnail_image_id?: string | null
        }
        Update: {
          created_at?: string
          creator_id?: string | null
          id?: string
          name?: string
          outline?: string
          posted_by_id?: string | null
          source_url?: string | null
          source_url_type?: Database["public"]["Enums"]["URL_TYPE"] | null
          thumbnail_image_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shots_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "assets_details"
            referencedColumns: ["creator_id"]
          },
          {
            foreignKeyName: "shots_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "cities_details"
            referencedColumns: ["creator_id"]
          },
          {
            foreignKeyName: "shots_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "creators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shots_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "shots_details"
            referencedColumns: ["creator_id"]
          },
          {
            foreignKeyName: "shots_thumbnail_image_id_fkey"
            columns: ["thumbnail_image_id"]
            isOneToOne: false
            referencedRelation: "shots_images"
            referencedColumns: ["id"]
          },
        ]
      }
      shots_images: {
        Row: {
          content_id: string
          created_at: string
          id: string
          posted_by: string
        }
        Insert: {
          content_id: string
          created_at?: string
          id: string
          posted_by?: string
        }
        Update: {
          content_id?: string
          created_at?: string
          id?: string
          posted_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "shots_images_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "shots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shots_images_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "shots_details"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      assets_details: {
        Row: {
          created_at: string | null
          creator_created_at: string | null
          creator_id: string | null
          creator_name: string | null
          creator_posted_by_id: string | null
          creator_profile_url: string | null
          creator_profile_url_type:
            | Database["public"]["Enums"]["URL_TYPE"]
            | null
          id: string | null
          image_ids: string[] | null
          name: string | null
          outline: string | null
          posted_by_id: string | null
          source_url: string | null
          source_url_type: Database["public"]["Enums"]["URL_TYPE"] | null
          thumbnail_image_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assets_thumbnail_image_id_fkey"
            columns: ["thumbnail_image_id"]
            isOneToOne: false
            referencedRelation: "assets_images"
            referencedColumns: ["id"]
          },
        ]
      }
      cities_details: {
        Row: {
          created_at: string | null
          creator_created_at: string | null
          creator_id: string | null
          creator_name: string | null
          creator_posted_by_id: string | null
          creator_profile_url: string | null
          creator_profile_url_type:
            | Database["public"]["Enums"]["URL_TYPE"]
            | null
          id: string | null
          image_ids: string[] | null
          name: string | null
          outline: string | null
          posted_by_id: string | null
          source_url: string | null
          source_url_type: Database["public"]["Enums"]["URL_TYPE"] | null
          thumbnail_image_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cities_thumbnail_image_id_fkey"
            columns: ["thumbnail_image_id"]
            isOneToOne: false
            referencedRelation: "cities_images"
            referencedColumns: ["id"]
          },
        ]
      }
      shots_details: {
        Row: {
          created_at: string | null
          creator_created_at: string | null
          creator_id: string | null
          creator_name: string | null
          creator_posted_by_id: string | null
          creator_profile_url: string | null
          creator_profile_url_type:
            | Database["public"]["Enums"]["URL_TYPE"]
            | null
          id: string | null
          image_ids: string[] | null
          name: string | null
          outline: string | null
          posted_by_id: string | null
          source_url: string | null
          source_url_type: Database["public"]["Enums"]["URL_TYPE"] | null
          thumbnail_image_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shots_thumbnail_image_id_fkey"
            columns: ["thumbnail_image_id"]
            isOneToOne: false
            referencedRelation: "shots_images"
            referencedColumns: ["id"]
          },
        ]
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
