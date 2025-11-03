import { supabase } from "./supabase";

export async function fetchFailureRating(fid){
    const TABLE = "sode";
    let { data: rating, error } = await supabase
        .from(TABLE)
        .select('fid, S, O, D, E')
        .eq('fid', fid)
        // .single();
    if (error) throw error;

    console.log("Fetched rating:", rating);
    return rating;
}

export async function fetchAllRatings(){
    const TABLE = "sode";
    let { data: ratings, error } = await supabase
        .from(TABLE)
        .select('fid, S, O, D, E')
    if (error) throw error;

    return {data: ratings};
}