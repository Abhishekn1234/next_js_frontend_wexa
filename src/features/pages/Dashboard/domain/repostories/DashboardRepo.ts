import type { DashboardStats } from "../entities/dashboard";


export interface DashboardRepository {
  getDashboardStats(): Promise<DashboardStats>;
}