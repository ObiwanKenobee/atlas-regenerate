import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export type Project = Tables<"projects">;
export type ProjectInsert = TablesInsert<"projects">;

export const useProjects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const fetchMyProjects = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      console.error("Error fetching my projects:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (project: Omit<ProjectInsert, "owner_id">) => {
    if (!user) {
      return { error: new Error("You must be logged in to create a project") };
    }

    try {
      const { data, error } = await supabase
        .from("projects")
        .insert({
          ...project,
          owner_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      
      setProjects(prev => [data, ...prev]);
      return { data, error: null };
    } catch (err) {
      console.error("Error creating project:", err);
      return { data: null, error: err instanceof Error ? err : new Error("Failed to create project") };
    }
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      
      setProjects(prev => prev.map(p => p.id === id ? data : p));
      return { data, error: null };
    } catch (err) {
      console.error("Error updating project:", err);
      return { data: null, error: err instanceof Error ? err : new Error("Failed to update project") };
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      setProjects(prev => prev.filter(p => p.id !== id));
      return { error: null };
    } catch (err) {
      console.error("Error deleting project:", err);
      return { error: err instanceof Error ? err : new Error("Failed to delete project") };
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    fetchProjects,
    fetchMyProjects,
    createProject,
    updateProject,
    deleteProject,
  };
};

export const useSubscriptionTiers = () => {
  const [tiers, setTiers] = useState<Tables<"subscription_tiers">[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTiers = async () => {
      try {
        const { data, error } = await supabase
          .from("subscription_tiers")
          .select("*")
          .eq("is_active", true)
          .order("monthly_price", { ascending: true });

        if (error) throw error;
        setTiers(data || []);
      } catch (err) {
        console.error("Error fetching subscription tiers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTiers();
  }, []);

  return { tiers, loading };
};

export const useUserSubscription = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Tables<"user_subscriptions"> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("user_subscriptions")
          .select("*")
          .eq("user_id", user.id)
          .eq("is_active", true)
          .maybeSingle();

        if (error) throw error;
        setSubscription(data);
      } catch (err) {
        console.error("Error fetching user subscription:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [user]);

  return { subscription, loading };
};
