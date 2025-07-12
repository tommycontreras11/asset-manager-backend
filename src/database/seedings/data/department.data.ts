import { DepartmentEntity } from "database/entities/entity/department.entity";

const departments = [
  {
    name: "Administration",
    description:
      "Oversees general administrative functions and office management.",
  },
  {
    name: "Finance",
    description:
      "Manages budgeting, financial planning, and investment decisions.",
  },
  {
    name: "Human Resources",
    description:
      "Handles employee relations, recruitment, and training programs.",
  },
  {
    name: "Accounting",
    description:
      "Responsible for bookkeeping, financial reporting, and compliance.",
  },
  {
    name: "Procurement",
    description:
      "Manages the acquisition of goods and services for the organization.",
  },
  {
    name: "Information Technology",
    description:
      "Maintains IT infrastructure, software systems, and data security.",
  },
  {
    name: "Maintenance",
    description:
      "Ensures the proper functioning and repair of company assets and facilities.",
  },
  {
    name: "Operations",
    description:
      "Oversees day-to-day business activities and process efficiency.",
  },
  {
    name: "Internal Audit",
    description:
      "Conducts audits to ensure compliance and reduce operational risk.",
  },
  {
    name: "Planning and Control",
    description:
      "Develops strategic plans and monitors organizational performance.",
  },
];

export const departmentsData: Partial<DepartmentEntity>[] = departments.map(
  (department) => ({
    name: department.name,
    description: department.description,
  })
);
