import { supabaseConfig } from "@/constants";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = supabaseConfig.apiUrl;
const supabaseAnonKey = supabaseConfig.apiKey;

export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "");
