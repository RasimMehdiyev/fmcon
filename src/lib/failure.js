// src/lib/failure.js
import { supabase } from "./supabase";


export async function fetchAllFailures(opts = {}) {
  const {
    orderBy = "created_at",
    ascending = false,
  } = opts;

  const TABLE = "failure";

// test connection
  console.log("Fetching failures from Supabase...");

  let { data: failure, error } = await supabase
    .from('failure')
    .select('*')
    .order(orderBy, { ascending: ascending });
    if (error) throw error;

  return { data: failure };
}

export async function addFailure(input) {
  const TABLE = "failure";

  const payload = {
    name: input.name?.trim(),
    definition: input.definition?.trim(),
    example: input.example ?? null,
    stage: Number(input.stage),
    idea: input.idea ?? null,
  };

  const { data, error } = await supabase
    .from(TABLE)
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
}
