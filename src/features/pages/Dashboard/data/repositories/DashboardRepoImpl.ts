import api from "../../../../api/api";
import type { DashboardStats } from "../../domain/entities/dashboard";
import type { DashboardRepository } from "../../domain/repostories/DashboardRepo";

export class DashboardRepositoryImpl
  implements DashboardRepository
{
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await api.get("/dashboard/stats");

    return response.data.data;
  }
}