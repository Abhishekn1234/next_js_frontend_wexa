import type { DashboardStats } from "../entities/dashboard";
import type { DashboardRepository } from "../repostories/DashboardRepo";

export class GetDashboardStatsUseCase {
  private readonly dashboardRepository: DashboardRepository;

  constructor(dashboardRepository: DashboardRepository) {
    this.dashboardRepository = dashboardRepository;
  }

  async execute(): Promise<DashboardStats> {
    return this.dashboardRepository.getDashboardStats();
  }
}