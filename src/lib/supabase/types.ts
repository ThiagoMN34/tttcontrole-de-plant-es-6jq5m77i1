// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.5'
  }
  public: {
    Tables: {
      approvers: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      employees: {
        Row: {
          contact: string
          created_at: string | null
          id: string
          name: string
          role: string
        }
        Insert: {
          contact: string
          created_at?: string | null
          id?: string
          name: string
          role: string
        }
        Update: {
          contact?: string
          created_at?: string | null
          id?: string
          name?: string
          role?: string
        }
        Relationships: []
      }
      guests: {
        Row: {
          created_at: string | null
          id: string
          name: string
          room: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          room: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          room?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string | null
          role: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          name?: string | null
          role?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string | null
          role?: string
        }
        Relationships: []
      }
      reasons: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      shifts: {
        Row: {
          created_at: string | null
          employee_id: string | null
          end_time: string
          guest_id: string | null
          id: string
          reason_id: string | null
          start_time: string
          status: string
          value: number | null
        }
        Insert: {
          created_at?: string | null
          employee_id?: string | null
          end_time: string
          guest_id?: string | null
          id?: string
          reason_id?: string | null
          start_time: string
          status?: string
          value?: number | null
        }
        Update: {
          created_at?: string | null
          employee_id?: string | null
          end_time?: string
          guest_id?: string | null
          id?: string
          reason_id?: string | null
          start_time?: string
          status?: string
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'shifts_employee_id_fkey'
            columns: ['employee_id']
            isOneToOne: false
            referencedRelation: 'employees'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'shifts_guest_id_fkey'
            columns: ['guest_id']
            isOneToOne: false
            referencedRelation: 'guests'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'shifts_reason_id_fkey'
            columns: ['reason_id']
            isOneToOne: false
            referencedRelation: 'reasons'
            referencedColumns: ['id']
          },
        ]
      }
      values: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          type: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          type: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          type?: string
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

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

// ====== DATABASE EXTENDED CONTEXT (auto-generated) ======
// This section contains actual PostgreSQL column types, constraints, RLS policies,
// functions, triggers, indexes and materialized views not present in the type definitions above.
// IMPORTANT: The TypeScript types above map UUID, TEXT, VARCHAR all to "string".
// Use the COLUMN TYPES section below to know the real PostgreSQL type for each column.
// Always use the correct PostgreSQL type when writing SQL migrations.

// --- COLUMN TYPES (actual PostgreSQL types) ---
// Use this to know the real database type when writing migrations.
// "string" in TypeScript types above may be uuid, text, varchar, timestamptz, etc.
// Table: approvers
//   id: uuid (not null, default: gen_random_uuid())
//   name: text (not null)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: employees
//   id: uuid (not null, default: gen_random_uuid())
//   name: text (not null)
//   role: text (not null)
//   contact: text (not null)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: guests
//   id: uuid (not null, default: gen_random_uuid())
//   name: text (not null)
//   room: text (not null)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: profiles
//   id: uuid (not null)
//   email: text (not null)
//   name: text (nullable)
//   role: text (not null, default: 'approver'::text)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: reasons
//   id: uuid (not null, default: gen_random_uuid())
//   name: text (not null)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: shifts
//   id: uuid (not null, default: gen_random_uuid())
//   employee_id: uuid (nullable)
//   guest_id: uuid (nullable)
//   reason_id: uuid (nullable)
//   start_time: timestamp with time zone (not null)
//   end_time: timestamp with time zone (not null)
//   status: text (not null, default: 'pending'::text)
//   value: numeric (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: values
//   id: uuid (not null, default: gen_random_uuid())
//   type: text (not null)
//   amount: numeric (not null)
//   created_at: timestamp with time zone (nullable, default: now())

// --- CONSTRAINTS ---
// Table: approvers
//   PRIMARY KEY approvers_pkey: PRIMARY KEY (id)
// Table: employees
//   PRIMARY KEY employees_pkey: PRIMARY KEY (id)
// Table: guests
//   PRIMARY KEY guests_pkey: PRIMARY KEY (id)
// Table: profiles
//   FOREIGN KEY profiles_id_fkey: FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
//   PRIMARY KEY profiles_pkey: PRIMARY KEY (id)
// Table: reasons
//   PRIMARY KEY reasons_pkey: PRIMARY KEY (id)
// Table: shifts
//   FOREIGN KEY shifts_employee_id_fkey: FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
//   FOREIGN KEY shifts_guest_id_fkey: FOREIGN KEY (guest_id) REFERENCES guests(id) ON DELETE CASCADE
//   PRIMARY KEY shifts_pkey: PRIMARY KEY (id)
//   FOREIGN KEY shifts_reason_id_fkey: FOREIGN KEY (reason_id) REFERENCES reasons(id) ON DELETE CASCADE
// Table: values
//   PRIMARY KEY values_pkey: PRIMARY KEY (id)

// --- ROW LEVEL SECURITY POLICIES ---
// Table: approvers
//   Policy "auth_all_approvers" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: employees
//   Policy "auth_all_employees" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
//   Policy "public_read_employees" (SELECT, PERMISSIVE) roles={public}
//     USING: true
// Table: guests
//   Policy "auth_all_guests" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
//   Policy "public_read_guests" (SELECT, PERMISSIVE) roles={public}
//     USING: true
// Table: profiles
//   Policy "auth_read_own_profile" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (auth.uid() = id)
//   Policy "master_all_profiles" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM profiles profiles_1   WHERE ((profiles_1.id = auth.uid()) AND (profiles_1.role = 'master'::text))))
//     WITH CHECK: (EXISTS ( SELECT 1    FROM profiles profiles_1   WHERE ((profiles_1.id = auth.uid()) AND (profiles_1.role = 'master'::text))))
//   Policy "public_read_profiles" (SELECT, PERMISSIVE) roles={public}
//     USING: true
// Table: reasons
//   Policy "auth_all_reasons" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
//   Policy "public_read_reasons" (SELECT, PERMISSIVE) roles={public}
//     USING: true
// Table: shifts
//   Policy "auth_all_shifts" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
//   Policy "public_insert_shifts" (INSERT, PERMISSIVE) roles={public}
//     WITH CHECK: true
// Table: values
//   Policy "auth_all_values" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true

// --- DATABASE FUNCTIONS ---
// FUNCTION handle_new_user()
//   CREATE OR REPLACE FUNCTION public.handle_new_user()
//    RETURNS trigger
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//   AS $function$
//   BEGIN
//     INSERT INTO public.profiles (id, email, name, role)
//     VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)), 'approver')
//     ON CONFLICT (id) DO NOTHING;
//     RETURN NEW;
//   END;
//   $function$
//
