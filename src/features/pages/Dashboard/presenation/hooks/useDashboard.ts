import { useQuery } from "@tanstack/react-query";
import { DashboardRepositoryImpl } from "../../data/repositories/DashboardRepoImpl";
import { GetDashboardStatsUseCase } from "../../domain/usecases/dashboardusecase";


const repository = new DashboardRepositoryImpl();

const getDashboardStatsUseCase =
  new GetDashboardStatsUseCase(repository);

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () =>
      getDashboardStatsUseCase.execute(),
  });
};