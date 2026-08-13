import api from "../../../../api/api";

import type {
  Developer,
  DeveloperPagination,
} from "../../domain/entities/developer";

import type {
  DeveloperRepository,
} from "../../domain/repositories/DeveloperRepo";

export class DeveloperRepositoryImpl
  implements DeveloperRepository
{
  async getDevelopers(
    page: number,
    limit: number,
    search?: string
  ): Promise<{
    developers: Developer[];
    pagination: DeveloperPagination;
  }> {
    const response = await api.get("/developers", {
      params: {
        page,
        limit,
        ...(search ? { search } : {}),
      },
    });

    return {
      developers: response.data.data ?? [],
      pagination: response.data.pagination,
    };
  }
}