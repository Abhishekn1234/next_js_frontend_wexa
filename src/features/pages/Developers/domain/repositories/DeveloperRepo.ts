import type {
  DeveloperPagination,
  Developer,
} from "../entities/developer";

export interface DeveloperRepository {
  getDevelopers(
    page: number,
    limit: number,
    search?: string
  ): Promise<{
    developers: Developer[];
    pagination: DeveloperPagination;
  }>;
}