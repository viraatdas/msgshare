import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jgiumbeaxukxlccwpwbf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnaXVtYmVheHVreGxjY3dwd2JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg1ODMxOTcsImV4cCI6MjAyNDE1OTE5N30.oS__y-4aBPliuqiGF8VvkMvgewueVBDDA7wT29Ef4T0";

export const supabase = createClient(supabaseUrl, supabaseKey);
