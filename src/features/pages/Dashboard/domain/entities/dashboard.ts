export interface DashboardRelationshipStats {
  hasSkill: number;
  requires: number;
  usesSkill: number;
  workedOn: number;
}

export interface DashboardProjectStatus {
  ongoing: number;
  completed: number;
  ongoingPercent: number;
  completedPercent: number;
}

export interface EmploymentTypeStats {
  type: string;
  count: number;
}

export interface DashboardStats {
  developers: number;
  jobs: number;
  skills: number;
  projects: number;

  relationships: DashboardRelationshipStats;

  projectStatus: DashboardProjectStatus;

  employmentTypes: EmploymentTypeStats[];
}