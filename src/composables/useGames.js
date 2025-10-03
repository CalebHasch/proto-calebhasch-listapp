import { ref } from "vue";
import { supabase } from "../supabase";
import { useAuth } from "./useAuth";

const games = ref([]);
const error = ref(null);

export function useGames() {
  const { user } = useAuth();

  const fetchGames = async () => {
    error.value = null;

    if (!user.value) return (games.value = []);

    const { data, error: err } = await supabase
      .from("Game List")
      .select("*")
      .eq("user_id", user.value.id)
      .order("date_received", { ascending: false })
      .order("created_at", { ascending: false });

    if (err) {
      error.value = err.message || "Failed to fetch games";
      return [];
    }

    games.value = data;
    return data;
  };

  const addGame = async (gameData) => {
    if (!user.value) return;
    error.value = "";

    const insertData = {
      user_id: user.value.id,
      game: gameData.game,
      genre: gameData.genre,
      player_rating: gameData.player_rating,
      date_received:
        gameData.date_received || new Date().toISOString().split("T")[0],
    };

    const { data, error: err } = await supabase
      .from("Game List")
      .insert([insertData])
      .select()
      .single();

    if (err) {
      error.value = err.message || "Failed to add game";
      return null;
    }

    games.value.unshift(data);
    return data;
  };

  const deleteGame = async (id) => {
    error.value = null;

    const { error: err } = await supabase
      .from("Game List")
      .delete()
      .eq("id", id)
      .eq("user_id", user.value.id);

    if (err) {
      error.value = err.message || "Failed to delete game";
      return false;
    }

    games.value = games.value.filter((g) => g.id !== id);
    return true;
  };

  return { games, error, fetchGames, addGame, deleteGame };
}
